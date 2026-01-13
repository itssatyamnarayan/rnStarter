/**
 * Store Index
 * Central export for all Zustand stores
 */

// Auth Store
export {
  useAuthStore,
  useUser,
  useIsAuthenticated,
  useAuthLoading,
  useAuthError,
  selectUser,
  selectIsAuthenticated,
  selectIsLoading,
  selectError,
} from './auth.store';

// Network Store
export {
  useNetworkStore,
  useIsOnline,
  useIsConnected,
  useIsInternetReachable,
  useConnectionType,
  useIsNetworkInitialized,
  selectIsOnline,
  selectIsConnected,
  selectIsInternetReachable,
} from './network.store';
export type { NetworkState } from './network.store';
