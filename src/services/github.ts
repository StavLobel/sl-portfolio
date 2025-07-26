// GitHub API Service - Following Project Standards
import { GitHubRepository, GitHubLanguages } from '@/types';

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

  async fetchUserProfile() {
    try {
      return await this.makeRequest(`/users/${this.username}`);
    } catch (error) {
      throw new Error(`Failed to fetch user profile: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Technology detection based on languages and common patterns
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