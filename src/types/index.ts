/**
 * TypeScript type definitions for the Stav Lobel Portfolio project
 */

// GitHub API Types
export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  clone_url: string;
  homepage: string | null;
  language: string | null;
  languages_url: string;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  fork: boolean;
  private: boolean;
  archived: boolean;
  disabled: boolean;
  topics: string[];
}

export interface GitHubLanguages {
  [language: string]: number;
}

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

// Badge Types for README extraction
export interface Badge {
  text: string;
  color: string;
  url?: string;
}

// Project Types
export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  lastUpdated: string;
  createdAt: string;
}

export interface Technology {
  name: string;
  color: string;
  icon?: string;
}

// UI Component Types
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface ApiResponse<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

// Theme Types
export type ThemeMode = 'light' | 'dark';

// Navigation Types
export interface NavItem {
  id: string;
  label: string;
  href: string;
}

// Contact Types
export interface ContactItem {
  label: string;
  value: string;
  link: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Configuration Types
export interface AppConfig {
  githubUsername: string;
  githubToken: string;
  excludedRepos: string[];
  featuredRepos: string[];
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    linkedin: string;
    resumeUrl: string;
  };
} 