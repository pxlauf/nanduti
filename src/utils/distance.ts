import { Location, Stop } from '@types';

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param coord1 First coordinate
 * @param coord2 Second coordinate
 * @returns Distance in meters
 */
export function calculateDistance(coord1: Location, coord2: Location): number;

/**
 * Find stops within a given radius from a location
 * @param location Center location
 * @param stops Array of stops to search
 * @param radius Search radius in meters
 * @returns Array of stops within radius with distance
 */
export function findStopsWithinRadius(
  location: Location,
  stops: Stop[],
  radius: number
): Array<Stop & { distance: number }>;

/**
 * Find nearest stop to a location
 * @param location Center location
 * @param stops Array of stops to search
 * @returns Nearest stop with distance, or null if no stops
 */
export function findNearestStop(
  location: Location,
  stops: Stop[]
): (Stop & { distance: number }) | null;

/**
 * Calculate bearing between two points
 * @param start Starting location
 * @param end Ending location
 * @returns Bearing in degrees
 */
export function calculateBearing(start: Location, end: Location): number;
