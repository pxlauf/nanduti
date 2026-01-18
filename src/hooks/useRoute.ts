import { useState, useEffect } from 'react';
import { Stop, Line, RouteSuggestion } from '@types';
import { Location as LocationType } from '@types';

interface UseRoutesResult {
  routes: RouteSuggestion[];
  loading: boolean;
  error: string | null;
  findRoutes: (origin: Stop | LocationType, destination: Stop) => Promise<void>;
  clearRoutes: () => void;
}

/**
 * Hook for finding routes between locations
 * @returns Routes state and control functions
 */
export function useRoute(): UseRoutesResult;

interface UseNearbyStopsResult {
  stops: Stop[];
  loading: boolean;
  error: string | null;
  findNearbyStops: (location: LocationType, radius?: number) => Promise<void>;
  clearStops: () => void;
}

/**
 * Hook for finding nearby stops
 * @returns Stops state and control functions
 */
export function useNearbyStops(): UseNearbyStopsResult;

interface UseLineDetailResult {
  line: Line | null;
  stops: Stop[];
  loading: boolean;
  error: string | null;
  loadLine: (lineId: number) => Promise<void>;
  clearLine: () => void;
}

/**
 * Hook for loading line details and stops
 * @param lineId Optional line ID to load on mount
 * @returns Line state and control functions
 */
export function useLineDetail(lineId?: number): UseLineDetailResult;
