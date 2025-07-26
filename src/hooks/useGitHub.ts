import { useState, useEffect } from 'react';
import { GitHubRepository, Project, ApiResponse } from '@/types';
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
        
        // Convert GitHub repositories to Project format with technology detection
        const projects: Project[] = await Promise.all(
          repos.map(async (repo) => {
            try {
              const languages = await githubService.fetchRepositoryLanguages(repo);
              const technologies = githubService.detectTechnologies(
                languages, 
                repo.name, 
                repo.description || undefined
              );

              return {
                id: repo.id.toString(),
                name: repo.name,
                description: repo.description || 'No description provided',
                technologies,
                githubUrl: repo.html_url,
                liveUrl: repo.homepage || undefined,
                featured: repo.stargazers_count > 5, // Auto-feature repos with 5+ stars
                lastUpdated: repo.updated_at,
              };
            } catch (error) {
              console.warn(`Failed to fetch languages for ${repo.name}:`, error);
              return {
                id: repo.id.toString(),
                name: repo.name,
                description: repo.description || 'No description provided',
                technologies: repo.language ? [repo.language] : [],
                githubUrl: repo.html_url,
                liveUrl: repo.homepage || undefined,
                featured: false,
                lastUpdated: repo.updated_at,
              };
            }
          })
        );

        // Sort by featured status, then by last updated
        projects.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        });

        if (isMounted) {
          setData(projects);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch repositories');
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