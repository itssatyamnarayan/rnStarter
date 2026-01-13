/**
 * Auth Store
 * 
 * Global authentication state management using Zustand.
 * Handles user authentication, token management, and auth persistence.
 * 
 * @requires zustand - Install with: npm install zustand
 * @requires @react-native-async-storage/async-storage - For persistence
 * 
 * Usage:
 * const { user, isAuthenticated, login, logout } = useAuthStore();
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User, AuthTokens, AuthState } from '../services/types/auth.types';
import { setAuthToken, clearTokens } from '../services/api/axios';
import { configureInterceptors } from '../services/api/interceptors';
import * as authApi from '../services/auth.api';

// ============================================================================
// Types
// ============================================================================

interface AuthActions {
  /** Initialize auth (check for existing session) */
  initialize: () => Promise<void>;
  /** Login with email and password */
  login: (email: string, password: string) => Promise<void>;
  /** Register new user */
  signup: (data: {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
  }) => Promise<void>;
  /** Logout current user */
  logout: () => Promise<void>;
  /** Update user data in store */
  setUser: (user: User | null) => void;
  /** Update tokens in store */
  setTokens: (tokens: AuthTokens | null) => void;
  /** Clear all auth state */
  clearAuth: () => void;
  /** Set loading state */
  setLoading: (loading: boolean) => void;
  /** Set error state */
  setError: (error: string | null) => void;
  /** Refresh authentication tokens */
  refreshTokens: () => Promise<void>;
}

type AuthStore = AuthState & AuthActions;

// ============================================================================
// Initial State
// ============================================================================

const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: true, // Start as loading to check persisted auth
  error: null,
};

// ============================================================================
// Store Implementation
// ============================================================================

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      initialize: async () => {
        const { tokens } = get();
        
        if (tokens?.accessToken) {
          // Set token in API client
          setAuthToken(tokens.accessToken);
          
          // Configure interceptors with store methods
          configureInterceptors({
            getAuthToken: () => get().tokens?.accessToken ?? null,
            getRefreshToken: () => get().tokens?.refreshToken ?? null,
            setAuthToken: (token) => {
              const currentTokens = get().tokens;
              if (currentTokens && token) {
                set({
                  tokens: { ...currentTokens, accessToken: token },
                });
              }
            },
            clearTokens: () => get().clearAuth(),
            onTokenRefresh: (newTokens) => {
              const currentTokens = get().tokens;
              if (currentTokens) {
                set({
                  tokens: {
                    ...currentTokens,
                    accessToken: newTokens.accessToken,
                    refreshToken: newTokens.refreshToken,
                  },
                });
              }
            },
            onLogout: () => get().logout(),
          });
          
          set({ isAuthenticated: true, isLoading: false });
        } else {
          set({ isLoading: false });
        }
      },

      login: async (email, password) => {
        set({ isLoading: true, error: null });

        try {
          const response = await authApi.login({ email, password });

          if (response.success) {
            const { user, tokens } = response.data;

            // Set token in API client
            setAuthToken(tokens.accessToken);

            set({
              user,
              tokens,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } else {
            throw new Error(response.message || 'Login failed');
          }
        } catch (error) {
          const message =
            error instanceof Error ? error.message : 'Login failed';
          set({
            isLoading: false,
            error: message,
          });
          throw error;
        }
      },

      signup: async (data) => {
        set({ isLoading: true, error: null });

        try {
          const response = await authApi.signup({
            ...data,
            acceptTerms: true,
          });

          if (response.success) {
            set({
              isLoading: false,
              error: null,
            });
            // Note: Most apps require email verification before login
            // The user object is not set here - redirect to verification screen
          } else {
            throw new Error(response.message || 'Signup failed');
          }
        } catch (error) {
          const message =
            error instanceof Error ? error.message : 'Signup failed';
          set({
            isLoading: false,
            error: message,
          });
          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true });

        try {
          // Call logout API (optional, depends on your backend)
          await authApi.logout();
        } catch {
          // Continue with local logout even if API fails
          console.warn('Logout API call failed, proceeding with local logout');
        } finally {
          // Clear tokens from API client
          clearTokens();

          // Reset store state
          set({
            ...initialState,
            isLoading: false,
          });
        }
      },

      setUser: (user) => {
        set({ user });
      },

      setTokens: (tokens) => {
        if (tokens) {
          setAuthToken(tokens.accessToken);
        } else {
          clearTokens();
        }
        set({ tokens, isAuthenticated: !!tokens });
      },

      clearAuth: () => {
        clearTokens();
        set(initialState);
      },

      setLoading: (isLoading) => {
        set({ isLoading });
      },

      setError: (error) => {
        set({ error });
      },

      refreshTokens: async () => {
        const { tokens } = get();

        if (!tokens?.refreshToken) {
          throw new Error('No refresh token available');
        }

        try {
          const response = await authApi.refreshToken({
            refreshToken: tokens.refreshToken,
          });

          if (response.success) {
            const newTokens = response.data.tokens;
            setAuthToken(newTokens.accessToken);
            set({ tokens: newTokens });
          } else {
            throw new Error('Token refresh failed');
          }
        } catch (error) {
          // If refresh fails, logout user
          get().logout();
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist these fields
      partialize: (state) => ({
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// ============================================================================
// Selectors (for optimized re-renders)
// ============================================================================

export const selectUser = (state: AuthStore) => state.user;
export const selectIsAuthenticated = (state: AuthStore) => state.isAuthenticated;
export const selectIsLoading = (state: AuthStore) => state.isLoading;
export const selectError = (state: AuthStore) => state.error;

// ============================================================================
// Hooks for common selections
// ============================================================================

export const useUser = () => useAuthStore(selectUser);
export const useIsAuthenticated = () => useAuthStore(selectIsAuthenticated);
export const useAuthLoading = () => useAuthStore(selectIsLoading);
export const useAuthError = () => useAuthStore(selectError);
