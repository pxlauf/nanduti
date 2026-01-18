import { LinePolyline } from '@types';
import { LatLng } from 'react-native-maps';

/**
 * Parse GeoJSON LineString to array of LatLng coordinates
 * @param polyline GeoJSON LineString geometry
 * @returns Array of LatLng coordinates
 */
export function parsePolyline(polyline: GeoJSON.LineString): LatLng[];

/**
 * Decode Google Maps encoded polyline
 * @param encoded Encoded polyline string
 * @returns Array of LatLng coordinates
 */
export function decodePolyline(encoded: string): LatLng[];

/**
 * Check if a point is on a polyline within a tolerance
 * @param point Point to check
 * @param polyline Polyline coordinates
 * @param tolerance Distance tolerance in meters
 * @returns True if point is near polyline
 */
export function isPointNearPolyline(
  point: LatLng,
  polyline: LatLng[],
  tolerance: number
): boolean;

/**
 * Find the nearest point on a polyline to a given point
 * @param point Point to find nearest to
 * @param polyline Polyline coordinates
 * @returns Nearest point on polyline
 */
export function findNearestPointOnPolyline(
  point: LatLng,
  polyline: LatLng[]
): LatLng;

/**
 * Calculate total length of a polyline
 * @param polyline Polyline coordinates
 * @returns Length in meters
 */
export function calculatePolylineLength(polyline: LatLng[]): number;
