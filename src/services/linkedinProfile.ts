// LinkedIn Profile Details Service
// Since LinkedIn doesn't provide a public API, this service stores profile information
// that can be manually updated with current LinkedIn details

export interface LinkedInProfile {
  name: string;
  headline: string;
  location: string;
  company: string;
  experience: string;
  education: string;
  skills: string[];
  summary: string;
  profileUrl: string;
}

class LinkedInProfileService {
  private profileData: LinkedInProfile;

  constructor() {
    // Default profile data - can be updated manually
    this.profileData = {
      name: "Stav Lobel",
      headline: "Software Engineer at REE Automotive",
      location: "Israel",
      company: "REE Automotive",
      experience: "Automation Developer with expertise in software engineering and system design",
      education: "B.Sc. Software Engineering, SCE - Shamoon College of Engineering",
      skills: [
        "Software Engineering",
        "Automation Development", 
        "System Design",
        "Object-Oriented Programming",
        "Clean Architecture",
        "CI/CD Pipelines",
        "Test Automation",
        "Problem Solving"
      ],
      summary: "Software Engineer with strong technical skills and a solid foundation in object-oriented programming, clean architecture, and scalable system design. Experienced in developing tools and automation workflows across complex environments.",
      profileUrl: "https://linkedin.com/in/stavlobel"
    };
  }

  /**
   * Get LinkedIn profile data
   */
  async getProfileData(): Promise<LinkedInProfile> {
    return this.profileData;
  }

  /**
   * Update profile data manually
   */
  updateProfileData(newData: Partial<LinkedInProfile>): void {
    this.profileData = { ...this.profileData, ...newData };
  }

  /**
   * Get profile headline
   */
  getHeadline(): string {
    return this.profileData.headline;
  }

  /**
   * Get current company
   */
  getCurrentCompany(): string {
    return this.profileData.company;
  }

  /**
   * Get location
   */
  getLocation(): string {
    return this.profileData.location;
  }

  /**
   * Get skills
   */
  getSkills(): string[] {
    return this.profileData.skills;
  }

  /**
   * Get experience summary
   */
  getExperience(): string {
    return this.profileData.experience;
  }

  /**
   * Get education
   */
  getEducation(): string {
    return this.profileData.education;
  }

  /**
   * Get profile summary
   */
  getSummary(): string {
    return this.profileData.summary;
  }

  /**
   * Get profile URL
   */
  getProfileUrl(): string {
    return this.profileData.profileUrl;
  }
}

export default LinkedInProfileService; 