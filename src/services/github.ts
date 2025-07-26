// GitHub API Service - Following Project Standards
import { GitHubRepository, GitHubLanguages, Badge } from '@/types';

class GitHubApiService {
  private baseUrl = 'https://api.github.com';
  private token: string;
  private username: string;
  private excludedRepos: string[];

  constructor() {
    this.token = import.meta.env.VITE_GITHUB_TOKEN;
    this.username = import.meta.env.VITE_GITHUB_USERNAME;
    this.excludedRepos = import.meta.env.VITE_GITHUB_EXCLUDE_REPOS?.split(',') || [];
    
    if (!this.token || !this.username) {
      throw new Error('GitHub token and username must be provided via environment variables');
    }
  }

  private async makeRequest<T>(endpoint: string): Promise<T> {
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, { headers });

    if (!response.ok) {
      if (response.status === 403) {
        const rateLimitReset = response.headers.get('X-RateLimit-Reset');
        const resetTime = rateLimitReset ? new Date(parseInt(rateLimitReset) * 1000).toLocaleTimeString() : 'unknown';
        throw new Error(`Rate limit exceeded. Resets at ${resetTime}. Consider using a GitHub token for higher limits.`);
      }
      if (response.status === 401) {
        throw new Error('Invalid GitHub token. Please check your VITE_GITHUB_TOKEN environment variable.');
      }
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }

  async fetchRepositories(): Promise<GitHubRepository[]> {
    try {
      const repos = await this.makeRequest<GitHubRepository[]>(
        `/users/${this.username}/repos?sort=updated&per_page=100&type=public`
      );

      // Apply filtering rules from our project standards
      return repos.filter(repo => 
        !repo.fork && 
        !this.excludedRepos.includes(repo.name) &&
        !repo.name.startsWith('.') &&
        !repo.archived &&
        !repo.disabled
      );
    } catch (error) {
      throw new Error(`Failed to fetch repositories: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async fetchRepositoryLanguages(repo: GitHubRepository): Promise<GitHubLanguages> {
    try {
      return await this.makeRequest<GitHubLanguages>(
        `/repos/${repo.full_name}/languages`
      );
    } catch {
      return {};
    }
  }

  async fetchRepositoryReadme(repo: GitHubRepository): Promise<string | null> {
    try {
      const response = await this.makeRequest<{ content: string; encoding: string }>(
        `/repos/${repo.full_name}/readme`
      );
      
      if (response.encoding === 'base64') {
        return atob(response.content);
      }
      
      return response.content;
    } catch {
      return null;
    }
  }

  extractBadgesFromReadme(readmeContent: string): Badge[] {
    if (!readmeContent) return [];

    // Regex to match markdown badges: [![text](shield_url)](link_url)
    const badgeRegex = /\[\!\[([^\]]+)\]\(([^)]+)\)\]\(([^)]+)\)/g;
    // Also match simple badges: ![text](shield_url)
    const simpleBadgeRegex = /\!\[([^\]]+)\]\(https:\/\/img\.shields\.io\/badge\/[^)]+\)/g;
    
    const badges: Badge[] = [];
    const processedTexts = new Set<string>();

    // Extract full badges with links
    let match;
    while ((match = badgeRegex.exec(readmeContent)) !== null) {
      const [, text, shieldUrl, linkUrl] = match;
      
      if (!processedTexts.has(text)) {
        badges.push({
          text: text.trim(),
          color: this.extractColorFromShieldUrl(shieldUrl),
          url: linkUrl
        });
        processedTexts.add(text);
      }
    }

    // Extract simple badges without links
    while ((match = simpleBadgeRegex.exec(readmeContent)) !== null) {
      const [fullMatch, text] = match;
      
      if (!processedTexts.has(text)) {
        badges.push({
          text: text.trim(),
          color: this.extractColorFromShieldUrl(fullMatch),
          url: undefined
        });
        processedTexts.add(text);
      }
    }

    // Limit to reasonable number and filter out generic badges
    return badges
      .filter(badge => 
        !badge.text.toLowerCase().includes('license') ||
        !badge.text.toLowerCase().includes('build') ||
        badge.text.length > 2
      )
      .slice(0, 8);
  }

  private extractColorFromShieldUrl(url: string): string {
    // Extract color from shields.io URL patterns
    const colorMatch = url.match(/(?:color=|-)([a-fA-F0-9]{6}|[a-zA-Z]+)(?:&|$|\))/);
    if (colorMatch) {
      const color = colorMatch[1];
      // Convert named colors to hex
      const colorMap: Record<string, string> = {
        'blue': '#007ec6',
        'green': '#4c1',
        'red': '#e05d44',
        'orange': '#fe7d37',
        'yellow': '#dfb317',
        'brightgreen': '#4c1',
        'lightgrey': '#9f9f9f',
        'success': '#4c1',
        'important': '#fe7d37',
        'critical': '#e05d44'
      };
      return colorMap[color.toLowerCase()] || `#${color}`;
    }
    
    // Default colors based on common patterns
    if (url.includes('python')) return '#3776ab';
    if (url.includes('javascript') || url.includes('node')) return '#f7df1e';
    if (url.includes('typescript')) return '#007acc';
    if (url.includes('react')) return '#61dafb';
    if (url.includes('vue')) return '#4fc08d';
    if (url.includes('java')) return '#ed8b00';
    if (url.includes('docker')) return '#2496ed';
    
    return '#007ec6'; // Default blue
  }

  async fetchRepositoryBadges(repo: GitHubRepository): Promise<string[]> {
    try {
      const readmeContent = await this.fetchRepositoryReadme(repo);
      if (!readmeContent) {
        // Fallback to language detection if no README
        const languages = await this.fetchRepositoryLanguages(repo);
        return this.detectTechnologies(languages, repo.name, repo.description || undefined);
      }

      const badges = this.extractBadgesFromReadme(readmeContent);
      if (badges.length > 0) {
        return badges.map(badge => badge.text);
      }

      // Fallback to language detection if no badges found
      const languages = await this.fetchRepositoryLanguages(repo);
      return this.detectTechnologies(languages, repo.name, repo.description || undefined);
    } catch {
      // Fallback to language detection on error
      const languages = await this.fetchRepositoryLanguages(repo);
      return this.detectTechnologies(languages, repo.name, repo.description || undefined);
    }
  }

  async fetchUserProfile() {
    try {
      return await this.makeRequest(`/users/${this.username}`);
    } catch (error) {
      throw new Error(`Failed to fetch user profile: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Technology detection based on languages and common patterns (fallback method)
  detectTechnologies(languages: GitHubLanguages, repoName: string, description?: string): string[] {
    const technologies: Set<string> = new Set();
    
    // Language-based detection
    Object.keys(languages).forEach(language => {
      switch (language.toLowerCase()) {
        case 'typescript':
          technologies.add('TypeScript');
          break;
        case 'javascript':
          technologies.add('JavaScript');
          break;
        case 'python':
          technologies.add('Python');
          break;
        case 'java':
          technologies.add('Java');
          break;
        case 'go':
          technologies.add('Go');
          break;
        case 'rust':
          technologies.add('Rust');
          break;
        case 'c++':
          technologies.add('C++');
          break;
        case 'c':
          technologies.add('C');
          break;
        case 'html':
          technologies.add('HTML');
          break;
        case 'css':
          technologies.add('CSS');
          break;
        case 'scss':
          technologies.add('SASS');
          break;
        default:
          technologies.add(language);
      }
    });

    // Framework/library detection based on repo name and description
    const content = `${repoName} ${description || ''}`.toLowerCase();
    
    if (content.includes('react')) technologies.add('React');
    if (content.includes('vue')) technologies.add('Vue.js');
    if (content.includes('angular')) technologies.add('Angular');
    if (content.includes('svelte')) technologies.add('Svelte');
    if (content.includes('next')) technologies.add('Next.js');
    if (content.includes('nuxt')) technologies.add('Nuxt.js');
    if (content.includes('vite')) technologies.add('Vite');
    if (content.includes('webpack')) technologies.add('Webpack');
    if (content.includes('tailwind')) technologies.add('Tailwind CSS');
    if (content.includes('bootstrap')) technologies.add('Bootstrap');
    if (content.includes('node')) technologies.add('Node.js');
    if (content.includes('express')) technologies.add('Express.js');
    if (content.includes('fastapi')) technologies.add('FastAPI');
    if (content.includes('django')) technologies.add('Django');
    if (content.includes('flask')) technologies.add('Flask');
    if (content.includes('docker')) technologies.add('Docker');
    if (content.includes('k8s') || content.includes('kubernetes')) technologies.add('Kubernetes');

    return Array.from(technologies).slice(0, 6); // Limit to 6 technologies
  }
}

export default GitHubApiService; 