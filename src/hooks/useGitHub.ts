import { useState, useEffect } from 'react';
import { Project, ApiResponse } from '@/types';
import GitHubApiService from '@/services/github';

const githubService = new GitHubApiService();

export const useGitHubRepositories = (): ApiResponse<Project[]> => {
  const [data, setData] = useState<Project[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchRepositories = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const repos = await githubService.fetchRepositories();
        
        if (!repos || repos.length === 0) {
          throw new Error('No repositories found. Please check your GitHub username and token configuration.');
        }
        
        // Convert GitHub repositories to Project format with badge extraction
        const projects: Project[] = await Promise.all(
          repos.map(async (repo) => {
            try {
              // Use the new badge extraction method
              const technologies = await githubService.fetchRepositoryBadges(repo);

              return {
                id: repo.id.toString(),
                name: repo.name,
                description: repo.description || 'No description provided',
                technologies,
                githubUrl: repo.html_url,
                liveUrl: repo.homepage || undefined,
                featured: repo.stargazers_count > 5, // Auto-feature repos with 5+ stars
                lastUpdated: repo.updated_at,
                createdAt: repo.created_at, // Add creation date for sorting
              };
            } catch {
              // Fallback to basic language detection on error
              return {
                id: repo.id.toString(),
                name: repo.name,
                description: repo.description || 'No description provided',
                technologies: repo.language ? [repo.language] : [],
                githubUrl: repo.html_url,
                liveUrl: repo.homepage || undefined,
                featured: false,
                lastUpdated: repo.updated_at,
                createdAt: repo.created_at, // Add creation date for sorting
              };
            }
          })
        );

        // Sort by featured status first, then by creation date (newest first)
        projects.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

        if (isMounted) {
          setData(projects);
        }
      } catch (err) {
        if (isMounted) {
          console.error('GitHub API error:', err);
          
          // If it's a configuration error, show sample projects
          if (err instanceof Error && (err.message.includes('token') || err.message.includes('rate limit'))) {
            console.log('Showing sample projects due to GitHub API configuration issues');
            setData([
              {
                id: 'sample-1',
                name: 'Portfolio Website',
                description: 'A modern React portfolio built with TypeScript, Tailwind CSS, and Vite. Features responsive design, dark mode, and GitHub integration.',
                technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
                githubUrl: 'https://github.com/StavLobel/sl-portfolio',
                liveUrl: 'https://stavlobel.com',
                featured: true,
                lastUpdated: new Date().toISOString(),
                createdAt: new Date().toISOString(),
              },
              {
                id: 'sample-2',
                name: 'AI Automation Tools',
                description: 'Collection of AI-powered automation scripts and tools for various engineering tasks.',
                technologies: ['Python', 'OpenAI API', 'FastAPI', 'Docker'],
                githubUrl: 'https://github.com/StavLobel',
                featured: true,
                lastUpdated: new Date().toISOString(),
                createdAt: new Date().toISOString(),
              },
              {
                id: 'sample-3',
                name: 'Data Processing Pipeline',
                description: 'High-performance data processing pipeline with real-time analytics and visualization.',
                technologies: ['Python', 'Apache Spark', 'Kafka', 'React'],
                githubUrl: 'https://github.com/StavLobel',
                featured: false,
                lastUpdated: new Date().toISOString(),
                createdAt: new Date().toISOString(),
              }
            ]);
          } else {
            setError(err instanceof Error ? err.message : 'Failed to fetch repositories');
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchRepositories();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, isLoading, error };
};

export const useGitHubProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const userProfile = await githubService.fetchUserProfile();
        
        if (isMounted) {
          setProfile(userProfile);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch profile');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  return { profile, isLoading, error };
}; 