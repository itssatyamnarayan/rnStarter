/**
 * API Endpoints
 * Centralized endpoint definitions for the entire application.
 * 
 * Benefits:
 * - Single source of truth for all API endpoints
 * - Easy to update base URLs or endpoint paths
 * - Type-safe endpoint management
 * - Enables easy mocking in tests
 */

// ============================================================================
// Base Configuration
// ============================================================================

/**
 * Environment-based API base URL
 * In production, replace with your actual API URL
 * 
 * For environment variables, use:
 * - react-native-config (recommended)
 * - @env (babel-plugin-transform-inline-environment-variables)
 */
export const API_CONFIG = {
  BASE_URL: __DEV__ ? 'http://localhost:3000/api/v1' : 'https://api.yourapp.com/v1',
  TIMEOUT: 30000, // 30 seconds
  VERSION: 'v1',
} as const;

// Declare __DEV__ for TypeScript (React Native provides this globally)
declare const __DEV__: boolean;

// ============================================================================
// Auth Endpoints
// ============================================================================

export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  SIGNUP: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh-token',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_EMAIL: '/auth/verify-email',
  RESEND_VERIFICATION: '/auth/resend-verification',
  CHANGE_PASSWORD: '/auth/change-password',
  
  // Social auth
  GOOGLE_AUTH: '/auth/google',
  APPLE_AUTH: '/auth/apple',
  FACEBOOK_AUTH: '/auth/facebook',
} as const;

// ============================================================================
// User Endpoints
// ============================================================================

export const USER_ENDPOINTS = {
  PROFILE: '/users/me',
  UPDATE_PROFILE: '/users/me',
  UPDATE_AVATAR: '/users/me/avatar',
  DELETE_ACCOUNT: '/users/me',
  PREFERENCES: '/users/me/preferences',
  
  // User by ID (admin or public profiles)
  GET_USER: (id: string) => `/users/${id}`,
  USERS_LIST: '/users',
  SEARCH_USERS: '/users/search',
} as const;

// ============================================================================
// Notification Endpoints
// ============================================================================

export const NOTIFICATION_ENDPOINTS = {
  LIST: '/notifications',
  READ: (id: string) => `/notifications/${id}/read`,
  READ_ALL: '/notifications/read-all',
  SETTINGS: '/notifications/settings',
  REGISTER_DEVICE: '/notifications/device',
  UNREGISTER_DEVICE: '/notifications/device',
} as const;

// ============================================================================
// Upload Endpoints
// ============================================================================

export const UPLOAD_ENDPOINTS = {
  IMAGE: '/uploads/image',
  DOCUMENT: '/uploads/document',
  PRESIGNED_URL: '/uploads/presigned-url',
} as const;

// ============================================================================
// Settings Endpoints
// ============================================================================

export const SETTINGS_ENDPOINTS = {
  APP_CONFIG: '/settings/config',
  TERMS: '/settings/terms',
  PRIVACY_POLICY: '/settings/privacy',
  FAQ: '/settings/faq',
  CONTACT: '/settings/contact',
} as const;

// ============================================================================
// Combined Endpoints Export
// ============================================================================

export const ENDPOINTS = {
  AUTH: AUTH_ENDPOINTS,
  USER: USER_ENDPOINTS,
  NOTIFICATION: NOTIFICATION_ENDPOINTS,
  UPLOAD: UPLOAD_ENDPOINTS,
  SETTINGS: SETTINGS_ENDPOINTS,
} as const;

// ============================================================================
// Helper to build full URL
// ============================================================================

export const buildUrl = (endpoint: string, params?: Record<string, string>): string => {
  let url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  if (params) {
    const queryString = Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
    
    if (queryString) {
      url += `?${queryString}`;
    }
  }
  
  return url;
};
