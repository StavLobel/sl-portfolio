import { useState, useEffect } from 'react';
import { ApiResponse } from '@/types';
import LinkedInService from '@/services/linkedin';

const linkedinService = new LinkedInService();

export const useLinkedInProfile = (): ApiResponse<string> => {
  const [state, setState] = useState<ApiResponse<string>>({
    data: null,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        
        // Try primary method first
        let result = await linkedinService.fetchProfilePicture();
        
        // If primary method fails, try alternative
        if (result.error || !result.data || result.data.includes('placeholder')) {
          result = await linkedinService.fetchProfilePictureAlternative();
        }

        setState({
          data: result.data,
          isLoading: false,
          error: result.error
        });

      } catch (error) {
        setState({
          data: null,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch LinkedIn profile'
        });
      }
    };

    fetchProfilePicture();
  }, []);

  return state;
};

export default useLinkedInProfile; 