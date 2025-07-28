// GitHub API Service - Following Project Standards
import { GitHubRepository, GitHubLanguages, Badge } from '@/types';

class GitHubApiService {
  private baseUrl = 'https://api.github.com';
  private token: string | null;
  private username: string;
  private excludedRepos: string[];
  private isConfigured: boolean;

  constructor() {
    this.token = import.meta.env.VITE_GITHUB_TOKEN || null;
    this.username = import.meta.env.VITE_GITHUB_USERNAME || 'StavLobel';
    this.excludedRepos = import.meta.env.VITE_GITHUB_EXCLUDE_REPOS?.split(',') || [];
    
    // Mark as configured if we have the required token
    this.isConfigured = !!this.token;
    
    if (!this.isConfigured) {
      console.warn('GitHub token not provided. API calls will be rate-limited. Set VITE_GITHUB_TOKEN for higher limits.');
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
      console.log(`Fetching repositories for user: ${this.username}`);
      console.log(`GitHub token configured: ${this.token ? 'Yes' : 'No'}`);
      
      const repos = await this.makeRequest<GitHubRepository[]>(
        `/users/${this.username}/repos?sort=updated&per_page=100&type=public`
      );

      console.log(`Found ${repos.length} total repositories`);

      // Apply filtering rules from our project standards
      const filteredRepos = repos.filter(repo => 
        !repo.fork && 
        !this.excludedRepos.includes(repo.name) &&
        !repo.name.startsWith('.') &&
        !repo.archived &&
        !repo.disabled
      );

      console.log(`After filtering: ${filteredRepos.length} repositories`);
      return filteredRepos;
    } catch (error) {
      console.error('Failed to fetch repositories:', error);
      throw error; // Re-throw to allow proper error handling
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
    const badgeRegex = /\[!\[([^\]]+)\]\(([^)]+)\)\]\(([^)]+)\)/g;
    // Also match simple badges: ![text](shield_url)
    const simpleBadgeRegex = /!\[([^\]]+)\]\(https:\/\/img\.shields\.io\/badge\/[^)]+\)/g;
    
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

    // Comprehensive technology whitelist
    const technologyKeywords = [
      // Programming Languages
      'python', 'javascript', 'typescript', 'java', 'c++', 'c#', 'go', 'rust', 'php', 'ruby', 'swift', 'kotlin', 'dart', 'scala', 'r', 'matlab', 'julia', 'perl', 'lua', 'elixir', 'erlang', 'haskell', 'clojure', 'f#', 'vb.net', 'objective-c', 'assembly',
      
      // Frontend Frameworks & Libraries
      'react', 'vue', 'angular', 'svelte', 'next.js', 'nuxt.js', 'gatsby', 'ember', 'backbone', 'jquery', 'alpine.js', 'stimulus', 'lit', 'stencil', 'preact', 'solid.js',
      
      // Backend Frameworks
      'node.js', 'express', 'fastapi', 'django', 'flask', 'rails', 'laravel', 'spring', 'asp.net', 'gin', 'fiber', 'actix', 'rocket', 'sinatra', 'phoenix', 'nest.js', 'koa', 'hapi',
      
      // Databases
      'postgresql', 'mysql', 'mongodb', 'redis', 'sqlite', 'oracle', 'mariadb', 'cassandra', 'dynamodb', 'firestore', 'firebase', 'supabase', 'cockroachdb', 'neo4j', 'influxdb', 'elasticsearch', 'couchdb',
      
      // Cloud & DevOps
      'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'terraform', 'ansible', 'jenkins', 'gitlab', 'github actions', 'circleci', 'travis', 'heroku', 'vercel', 'netlify', 'cloudflare', 'digitalocean', 'vagrant',
      
      // Testing Frameworks
      'pytest', 'jest', 'mocha', 'chai', 'jasmine', 'cypress', 'selenium', 'playwright', 'puppeteer', 'junit', 'testng', 'rspec', 'phpunit', 'karma', 'protractor', 'webdriver', 'allure', 'allure-pytest', 'allure-reports',
      
      // Mobile Development
      'react native', 'flutter', 'ionic', 'xamarin', 'cordova', 'phonegap', 'titanium', 'nativescript',
      
      // CSS & Styling
      'css', 'sass', 'scss', 'less', 'stylus', 'tailwind', 'bootstrap', 'material-ui', 'chakra ui', 'styled-components', 'emotion', 'postcss',
      
      // Build Tools & Package Managers
      'webpack', 'vite', 'rollup', 'parcel', 'gulp', 'grunt', 'npm', 'yarn', 'pnpm', 'pip', 'composer', 'maven', 'gradle', 'cargo', 'go mod', 'nuget',
      
      // Data Science & ML
      'pandas', 'numpy', 'tensorflow', 'pytorch', 'scikit-learn', 'keras', 'opencv', 'matplotlib', 'seaborn', 'plotly', 'jupyter', 'anaconda', 'spark', 'hadoop',
      
      // Game Development
      'unity', 'unreal', 'godot', 'phaser', 'pygame', 'libgdx', 'cocos2d', 'babylonjs', 'threejs',
      
      // APIs & Protocols
      'rest', 'graphql', 'grpc', 'websocket', 'soap', 'oauth', 'jwt', 'api', 'json', 'xml', 'yaml', 'protobuf',
      
      // Version Control & Code Quality
      'git', 'svn', 'mercurial', 'eslint', 'prettier', 'black', 'pylint', 'sonarqube', 'codecov',
      
      // Other Technologies
      'electron', 'tauri', 'cordova', 'pwa', 'webassembly', 'blockchain', 'solidity', 'web3', 'ipfs', 'linux', 'windows', 'macos', 'ubuntu', 'debian', 'centos', 'alpine'
    ];

    // Filter badges to only include technologies
    const filteredBadges = badges.filter(badge => {
      const text = badge.text.toLowerCase();
      
      // More specific exclusion patterns - avoid overly broad terms
      const excludePatterns = [
        'license', 'mit license', 'apache license', 'gpl license',
        'build status', 'build passing', 'build failing', 'build unknown',
        'test status', 'tests passing', 'tests failing', 'test coverage',
        'code coverage', 'code quality score',
        'code style', 'code format', 'code lint',
        'pre-commit hooks', 'pre-commit.ci',
        'workflow status', 'deployment status', 'deploy status',
        'version badge', 'release version', 'latest release',
        'download count', 'downloads', 'npm downloads',
        'stars count', 'github stars', 'forks count', 'github forks',
        'open issues', 'closed issues', 'pull requests',
        'pipeline status', 'ci status', 'cd status',
        'security score', 'vulnerability scan', 'audit results',
        'maintenance status', 'maintained', 'unmaintained',
        'stability', 'stable release', 'beta release', 'alpha release',
        'experimental', 'deprecated', 'archived'
      ];
      
      // Check if badge text exactly matches or contains excluded patterns
      const isExcluded = excludePatterns.some(pattern => {
        return text === pattern || text.includes(pattern);
      });
      if (isExcluded) return false;
      
      // Check if badge matches technology keywords with better matching
      const isTechnology = technologyKeywords.some(tech => {
        const techLower = tech.toLowerCase();
        
        // Exact match
        if (text === techLower) return true;
        
        // Handle variations like "Node.js" vs "nodejs", "React Native" vs "react-native"
        const normalizedTech = techLower.replace(/[.\s-]/g, '');
        const normalizedText = text.replace(/[.\s-]/g, '');
        
        // Check if normalized versions match
        if (normalizedText === normalizedTech) return true;
        
        // For compound technologies like "GitHub Actions", check if the full text contains the technology
        if (techLower.includes(' ') && text.includes(techLower)) return true;
        
        // Check if text starts with or ends with the technology name
        if (text.startsWith(techLower) || text.endsWith(techLower)) return true;
        if (normalizedText.startsWith(normalizedTech) || normalizedText.endsWith(normalizedTech)) return true;
        
        return false;
      });
      
      // Also include common technology patterns that might not be in our whitelist
      const commonTechPatterns = [
        /^[a-z]+\s*v?\d+(\.\d+)*$/i,  // Technology with version like "Python 3.8"
        /^v?\d+\.\d+(\.\d+)?$/,       // Version numbers like "3.8.1"
        /^\w+\s*(framework|library|tool|sdk|api)$/i, // Technology type indicators
        /^(python|node|java|go|rust|php|ruby)\s/i   // Common language prefixes
      ];
      
      const matchesTechPattern = commonTechPatterns.some(pattern => pattern.test(text));
      
      return isTechnology || matchesTechPattern;
    });

    // Limit to reasonable number and ensure minimum length
    return filteredBadges
      .filter(badge => badge.text.length > 1)
      .slice(0, 10); // Increased from 8 to 10 to show more technologies
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
      console.error('Failed to fetch user profile:', error);
      return null; // Return null instead of throwing
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

  // Helper method to check if service is properly configured
  isReady(): boolean {
    return this.isConfigured;
  }
}

export default GitHubApiService; 