import { Stop, Line, RouteSuggestion } from '@types';
import { Location as LocationType } from '@types';

/**
 * Find routes between two stops
 * @param origin Origin stop
 * @param destination Destination stop
 * @returns Array of route suggestions
 */
export async function findRoutes(
  origin: Stop,
  destination: Stop
): Promise<RouteSuggestion[]>;

/**
 * Find routes from a location to a stop
 * @param origin Origin location
 * @param destination Destination stop
 * @returns Array of route suggestions
 */
export async function findRoutesToStop(
  origin: LocationType,
  destination: Stop
): Promise<RouteSuggestion[]>;

/**
 * Find routes from a stop to a location
 * @param origin Origin stop
 * @param destination Destination location
 * @returns Array of route suggestions
 */
export async function findRoutesFromStop(
  origin: Stop,
  destination: LocationType
): Promise<RouteSuggestion[]>;

/**
 * Find direct lines that serve both stops
 * @param origin Origin stop ID
 * @param destination Destination stop ID
 * @returns Array of direct lines
 */
export async function findDirectLines(
  origin: number,
  destination: number
): Promise<Line[]>;

/**
 * Find transfer routes (lines with transfers)
 * @param origin Origin stop ID
 * @param destination Destination stop ID
 * @returns Array of route suggestions with transfers
 */
export async function findTransferRoutes(
  origin: number,
  destination: number
): Promise<RouteSuggestion[]>;

/**
 * Find nearby stops to a location
 * @param location Center location
 * @param radius Search radius in meters
 * @param maxStops Maximum number of stops to return
 * @returns Array of nearby stops
 */
export async function findNearbyStops(
  location: LocationType,
  radius: number,
  maxStops: number
): Promise<Stop[]>;

/**
 * Calculate estimated travel time for a route
 * @param stops Array of stops on route
 * @returns Estimated time in minutes
 */
export function estimateTravelTime(stops: Stop[]): number;

/**
 * Find optimal route based on distance and time
 * @param suggestions Array of route suggestions
 * @returns Best route suggestion
 */
export function findOptimalRoute(suggestions: RouteSuggestion[]): RouteSuggestion | null;
