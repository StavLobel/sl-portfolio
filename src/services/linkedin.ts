// LinkedIn Profile Service - Following Project Standards
import { ApiResponse } from '@/types';



class LinkedInService {
  private linkedinUrl: string;
  private fallbackImage: string;
  private manualProfilePicUrl: string | null;

  constructor() {
    // Use environment variable or fallback to default
    this.linkedinUrl = import.meta.env.VITE_LINKEDIN_PROFILE_URL || 'https://www.linkedin.com/in/stavlobel/';
    // Manual LinkedIn profile picture URL (you can set this in .env.local)
    this.manualProfilePicUrl = import.meta.env.VITE_LINKEDIN_PROFILE_PIC_URL || null;
    // Use a better fallback - UI Avatars with portfolio theme colors
    this.fallbackImage = `https://ui-avatars.com/api/?name=Stav+Lobel&background=10b981&color=ffffff&size=320&bold=true&font-size=0.4`;
  }

  /**
   * Fetch LinkedIn profile picture using multiple fallback methods
   * Note: LinkedIn doesn't provide a public API for profile pictures
   * This uses multiple approaches to get the profile picture
   */
  async fetchProfilePicture(): Promise<ApiResponse<string>> {
    try {
      // Method 0: Check if manual profile picture URL is provided
      if (this.manualProfilePicUrl) {
        return {
          data: this.manualProfilePicUrl,
          isLoading: false,
          error: null
        };
      }

      // Method 1: Try using a public LinkedIn profile picture service
      const profileId = this.extractProfileId();
      
      if (profileId) {
        const directUrl = `https://media.licdn.com/dms/image/${profileId}/profile-displayphoto-shrink_800_800/0/0?e=1234567890&v=beta&t=your-token`;
        
        // Test if the image is accessible
        const imageResponse = await fetch(directUrl, { method: 'HEAD' });
        
        if (imageResponse.ok) {
          return {
            data: directUrl,
            isLoading: false,
            error: null
          };
        }
      }

      // Method 2: Try using a proxy service
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(this.linkedinUrl)}`;
      
      const response = await fetch(proxyUrl, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Portfolio-Bot/1.0)',
        },
      });

      if (response.ok) {
        const html = await response.text();
        
        // Extract profile picture URL from LinkedIn page
        const profilePicMatch = html.match(/profilePictureUrl":"([^"]+)"/);
        
        if (profilePicMatch && profilePicMatch[1]) {
          return {
            data: profilePicMatch[1],
            isLoading: false,
            error: null
          };
        }
      }

      // Method 3: Use Gravatar or UI Avatars as fallback
      return {
        data: this.fallbackImage,
        isLoading: false,
        error: null
      };

    } catch (error) {
      // Return fallback image on error
      return {
        data: this.fallbackImage,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Extract LinkedIn profile ID from URL
   */
  private extractProfileId(): string | null {
    const match = this.linkedinUrl.match(/linkedin\.com\/in\/([^/?]+)/);
    return match ? match[1] : null;
  }

  /**
   * Alternative method using a different proxy service
   */
  async fetchProfilePictureAlternative(): Promise<ApiResponse<string>> {
    try {
      // Method 2: Use a different proxy service
      const proxyUrl = `https://cors-anywhere.herokuapp.com/${this.linkedinUrl}`;
      
      const response = await fetch(proxyUrl, {
        method: 'GET',
        headers: {
          'Origin': window.location.origin,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch LinkedIn profile: ${response.status}`);
      }

      const html = await response.text();
      
      // Look for profile picture in different formats
      const patterns = [
        /profilePictureUrl":"([^"]+)"/,
        /"profilePicture":{"url":"([^"]+)"/,
        /<img[^>]*class="[^"]*profile-picture[^"]*"[^>]*src="([^"]+)"/,
      ];

      for (const pattern of patterns) {
        const match = html.match(pattern);
        if (match && match[1]) {
          return {
            data: match[1],
            isLoading: false,
            error: null
          };
        }
      }

      return {
        data: this.fallbackImage,
        isLoading: false,
        error: null
      };

    } catch (error) {
      return {
        data: this.fallbackImage,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Get LinkedIn profile URL
   */
  getLinkedInUrl(): string {
    return this.linkedinUrl;
  }

  /**
   * Update LinkedIn profile URL
   */
  updateLinkedInUrl(url: string): void {
    this.linkedinUrl = url;
  }

  /**
   * Set manual profile picture URL
   */
  setManualProfilePicUrl(url: string): void {
    this.manualProfilePicUrl = url;
  }
}

export default LinkedInService; 