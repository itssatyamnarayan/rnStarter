/**
 * User Types
 * Type definitions for user-related API requests and responses
 */

import type { User } from './auth.types';

// ============================================================================
// User Profile
// ============================================================================

export interface UserProfile extends User {
  bio?: string;
  location?: string;
  website?: string;
  socialLinks?: SocialLinks;
  preferences?: UserPreferences;
}

export interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
}

export interface UserPreferences {
  language: string;
  timezone: string;
  theme: 'light' | 'dark' | 'system';
  notifications: NotificationPreferences;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
  marketing: boolean;
}

// ============================================================================
// Update Profile
// ============================================================================

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  bio?: string;
  location?: string;
  website?: string;
  socialLinks?: Partial<SocialLinks>;
}

export interface UpdateProfileResponse {
  user: UserProfile;
  message: string;
}

// ============================================================================
// Avatar
// ============================================================================

export interface UpdateAvatarRequest {
  avatar: {
    uri: string;
    type: string;
    name: string;
  };
}

export interface UpdateAvatarResponse {
  avatarUrl: string;
  message: string;
}

// ============================================================================
// User Settings
// ============================================================================

export interface UpdatePreferencesRequest {
  language?: string;
  timezone?: string;
  theme?: 'light' | 'dark' | 'system';
  notifications?: Partial<NotificationPreferences>;
}

// ============================================================================
// Account Management
// ============================================================================

export interface DeleteAccountRequest {
  password: string;
  reason?: string;
}

export interface DeleteAccountResponse {
  message: string;
}

export interface DeactivateAccountRequest {
  password: string;
}

// ============================================================================
// User Search / List
// ============================================================================

export interface UserSearchParams {
  query?: string;
  page?: number;
  limit?: number;
  role?: string;
  isActive?: boolean;
}

export interface UserListItem {
  id: string;
  email: string;
  fullName: string;
  avatar?: string;
  isActive: boolean;
}
