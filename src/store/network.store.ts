/**
 * Network Store
 * 
 * Global network connectivity state management using Zustand.
 * Monitors internet connection and provides status across the app.
 * 
 * @requires zustand - Install with: npm install zustand
 * @requires @react-native-community/netinfo - Install with: npm install @react-native-community/netinfo
 * 
 * Usage:
 * const { isConnected, isInternetReachable } = useNetworkStore();
 * const isOnline = useIsOnline();
 */

import { create } from 'zustand';

// ============================================================================
// Types
// ============================================================================

export interface NetworkState {
  /** Whether device is connected to a network */
  isConnected: boolean;
  /** Whether internet is actually reachable */
  isInternetReachable: boolean | null;
  /** Network connection type (wifi, cellular, etc.) */
  connectionType: string | null;
  /** Whether network status has been determined */
  isInitialized: boolean;
}

interface NetworkActions {
  /** Update network status */
  setNetworkStatus: (status: Partial<NetworkState>) => void;
  /** Set initialized state */
  setInitialized: (initialized: boolean) => void;
  /** Reset network state */
  reset: () => void;
}

type NetworkStore = NetworkState & NetworkActions;

// ============================================================================
// Initial State
// ============================================================================

const initialState: NetworkState = {
  isConnected: true, // Assume connected initially
  isInternetReachable: true,
  connectionType: null,
  isInitialized: false,
};

// ============================================================================
// Store
// ============================================================================

export const useNetworkStore = create<NetworkStore>((set) => ({
  ...initialState,

  setNetworkStatus: (status) =>
    set((state) => ({
      ...state,
      ...status,
      isInitialized: true,
    })),

  setInitialized: (initialized) =>
    set({ isInitialized: initialized }),

  reset: () => set(initialState),
}));

// ============================================================================
// Selectors (for optimized re-renders)
// ============================================================================

/**
 * Check if device is online (connected + internet reachable)
 */
export const useIsOnline = () =>
  useNetworkStore((state) => state.isConnected && state.isInternetReachable !== false);

/**
 * Get connection status
 */
export const useIsConnected = () =>
  useNetworkStore((state) => state.isConnected);

/**
 * Get internet reachability status
 */
export const useIsInternetReachable = () =>
  useNetworkStore((state) => state.isInternetReachable);

/**
 * Get connection type
 */
export const useConnectionType = () =>
  useNetworkStore((state) => state.connectionType);

/**
 * Check if network status is initialized
 */
export const useIsNetworkInitialized = () =>
  useNetworkStore((state) => state.isInitialized);

// ============================================================================
// Non-hook selectors (for use outside components)
// ============================================================================

export const selectIsOnline = (state: NetworkStore) =>
  state.isConnected && state.isInternetReachable !== false;

export const selectIsConnected = (state: NetworkStore) => state.isConnected;

export const selectIsInternetReachable = (state: NetworkStore) =>
  state.isInternetReachable;
