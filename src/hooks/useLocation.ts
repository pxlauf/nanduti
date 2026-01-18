import { useState, useEffect } from 'react';
import { Location as LocationType } from '@types';

interface UseLocationResult {
  location: LocationType | null;
  loading: boolean;
  error: string | null;
  requestPermission: () => Promise<void>;
  refreshLocation: () => Promise<void>;
}

/**
 * Hook for managing device location
 * @returns Location state and control functions
 */
export function useLocation(): UseLocationResult;

interface UseWatchLocationResult extends UseLocationResult {
  stopWatching: () => void;
  isWatching: boolean;
}

/**
 * Hook for watching location updates
 * @param updateInterval Update interval in milliseconds
 * @returns Location state and control functions
 */
export function useWatchLocation(updateInterval?: number): UseWatchLocationResult;
