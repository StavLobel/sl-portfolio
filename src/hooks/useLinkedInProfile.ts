import { useState, useEffect } from 'react';
import LinkedInProfileService, { LinkedInProfile } from '@/services/linkedinProfile';

export const useLinkedInProfile = () => {
  const [data, setData] = useState<LinkedInProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        const profileService = new LinkedInProfileService();
        const profileData = await profileService.getProfileData();
        setData(profileData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch LinkedIn profile data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  return { data, isLoading, error };
}; 