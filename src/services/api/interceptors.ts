/**
 * Axios Interceptors
 * 
 * Request and response interceptors for handling:
 * - Network connectivity check
 * - Authentication token injection
 * - Token refresh on 401 errors
 * - Error transformation
 * - Request/response logging (development)
 */

import type { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { AUTH_ENDPOINTS } from './endPoints';
import type { ApiError } from '../../types/api.types';
import type { RefreshTokenResponse } from '../types/auth.types';
import { useNetworkStore } from '../../store/network.store';

// ============================================================================
// Types
// ============================================================================

interface FailedRequest {
  resolve: (token: string) => void;
  reject: (error: Error) => void;
}

// ============================================================================
// Token Refresh State
// ============================================================================

let isRefreshing = false;
let failedRequestsQueue: FailedRequest[] = [];

// Token getters/setters (implemented in axios.ts, imported here for type reference)
// These will be properly connected when the module is loaded
let getAuthTokenFn: () => string | null = () => null;
let getRefreshTokenFn: () => string | null = () => null;
let setAuthTokenFn: (token: string | null) => void = () => {};
let clearTokensFn: () => void = () => {};
let onTokenRefreshFn: ((tokens: { accessToken: string; refreshToken: string }) => void) | null = null;
let onLogoutFn: (() => void) | null = null;

// ============================================================================
// Interceptor Configuration Functions
// ============================================================================

/**
 * Configure token functions for the interceptors
 * Call this from your auth store/provider initialization
 */
export const configureInterceptors = (config: {
  getAuthToken: () => string | null;
  getRefreshToken: () => string | null;
  setAuthToken: (token: string | null) => void;
  clearTokens: () => void;
  onTokenRefresh?: (tokens: { accessToken: string; refreshToken: string }) => void;
  onLogout?: () => void;
}): void => {
  getAuthTokenFn = config.getAuthToken;
  getRefreshTokenFn = config.getRefreshToken;
  setAuthTokenFn = config.setAuthToken;
  clearTokensFn = config.clearTokens;
  onTokenRefreshFn = config.onTokenRefresh ?? null;
  onLogoutFn = config.onLogout ?? null;
};

// ============================================================================
// Setup Function
// ============================================================================

/**
 * Setup request and response interceptors on an Axios instance
 */
export const setupInterceptors = (instance: AxiosInstance): void => {
  // =========================================================================
  // Request Interceptor
  // =========================================================================
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Check network connectivity before making request
      const networkState = useNetworkStore.getState();
      const isOnline = networkState.isConnected && networkState.isInternetReachable !== false;
      
      if (!isOnline) {
        // Reject immediately if offline
        const error: ApiError = {
          success: false,
          message: 'No internet connection. Please check your network and try again.',
          code: 'NETWORK_ERROR',
          statusCode: 0,
        };
        return Promise.reject(error);
      }

      // Add auth token if available
      const token = getAuthTokenFn();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Development logging
      if (__DEV__) {
        console.log(`🚀 [API Request] ${config.method?.toUpperCase()} ${config.url}`);
        if (config.data) {
          console.log('📦 Request Data:', config.data);
        }
      }

      return config;
    },
    (error: AxiosError) => {
      if (__DEV__) {
        console.error('❌ [Request Error]', error.message);
      }
      return Promise.reject(error);
    }
  );

  // =========================================================================
  // Response Interceptor
  // =========================================================================
  instance.interceptors.response.use(
    (response) => {
      // Development logging
      if (__DEV__) {
        console.log(`✅ [API Response] ${response.config.url}`, response.status);
      }
      return response;
    },
    async (error: AxiosError<ApiError>) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      // Development logging
      if (__DEV__) {
        console.error(
          `❌ [API Error] ${originalRequest?.url}`,
          error.response?.status,
          error.response?.data?.message
        );
      }

      // Handle 401 Unauthorized - Token expired
      if (error.response?.status === 401 && !originalRequest._retry) {
        // Don't retry refresh token requests
        if (originalRequest.url?.includes(AUTH_ENDPOINTS.REFRESH_TOKEN)) {
          clearTokensFn();
          onLogoutFn?.();
          return Promise.reject(error);
        }

        if (isRefreshing) {
          // Queue the request while token is being refreshed
          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              resolve: (token: string) => {
                if (originalRequest.headers) {
                  originalRequest.headers.Authorization = `Bearer ${token}`;
                }
                resolve(instance(originalRequest));
              },
              reject: (err: Error) => {
                reject(err);
              },
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const refreshToken = getRefreshTokenFn();
          
          if (!refreshToken) {
            throw new Error('No refresh token available');
          }

          // Make refresh token request
          const response = await instance.post<{ data: RefreshTokenResponse }>(
            AUTH_ENDPOINTS.REFRESH_TOKEN,
            { refreshToken }
          );

          const { accessToken, refreshToken: newRefreshToken } = response.data.data.tokens;

          // Update tokens
          setAuthTokenFn(accessToken);
          onTokenRefreshFn?.({ accessToken, refreshToken: newRefreshToken });

          // Update authorization header for the original request
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          }

          // Process queued requests
          failedRequestsQueue.forEach((request) => {
            request.resolve(accessToken);
          });
          failedRequestsQueue = [];

          return instance(originalRequest);
        } catch (refreshError) {
          // Token refresh failed - logout user
          failedRequestsQueue.forEach((request) => {
            request.reject(refreshError as Error);
          });
          failedRequestsQueue = [];

          clearTokensFn();
          onLogoutFn?.();

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      // Transform error to a consistent format
      const apiError: ApiError = {
        success: false,
        message: error.response?.data?.message || error.message || 'An error occurred',
        code: error.response?.data?.code,
        errors: error.response?.data?.errors,
        statusCode: error.response?.status,
      };

      return Promise.reject(apiError);
    }
  );
};

// Declare __DEV__ for TypeScript
declare const __DEV__: boolean;
