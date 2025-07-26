// GitHub API Service Template - Following Project Standards

interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  languages_url: string;
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
  topics: string[];
}

interface GitHubApiResponse<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

class GitHubApiService {
  private baseUrl = 'https://api.github.com';
  private token: string;
  private username: string;

  constructor() {
    this.token = import.meta.env.VITE_GITHUB_TOKEN;
    this.username = import.meta.env.VITE_GITHUB_USERNAME;
    
    if (!this.token || !this.username) {
      throw new Error('GitHub token and username must be provided via environment variables');
    }
  }

  private async makeRequest<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('Rate limit exceeded. Please try again later.');
        }
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('GitHub API request failed:', error);
      throw error;
    }
  }

  async fetchRepositories(): Promise<GitHubRepository[]> {
    const repos = await this.makeRequest<GitHubRepository[]>(
      `/users/${this.username}/repos?sort=updated&per_page=100`
    );

    // Apply filtering rules
    const excludedRepos = import.meta.env.VITE_GITHUB_EXCLUDE_REPOS?.split(',') || [];
    
    return repos.filter(repo => 
      !repo.fork && 
      !excludedRepos.includes(repo.name) &&
      !repo.name.startsWith('.')
    );
  }

  async fetchRepositoryLanguages(repo: GitHubRepository): Promise<Record<string, number>> {
    return this.makeRequest<Record<string, number>>(
      `/repos/${repo.full_name}/languages`
    );
  }
}

export default GitHubApiService; 