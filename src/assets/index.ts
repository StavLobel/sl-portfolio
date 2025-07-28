// Profile picture configuration
// Import the profile picture as a Vite asset for proper bundling
import profilePictureUrl from './profile-picture.jpg';

export const profilePictureSrc = profilePictureUrl;

// Fallback to UI Avatars if the local image is not available
export const fallbackProfilePicture = 'https://ui-avatars.com/api/?name=Stav+Lobel&background=10b981&color=ffffff&size=320&bold=true&font-size=0.4'; 