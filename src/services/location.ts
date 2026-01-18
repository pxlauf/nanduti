import * as Location from 'expo-location';
import { Location as LocationType } from '@types';

/**
 * Request location permissions
 * @returns True if permission granted, false otherwise
 */
export async function requestLocationPermission(): Promise<boolean>;

/**
 * Get current device location
 * @returns Current location or null
 */
export async function getCurrentLocation(): Promise<LocationType | null>;

/**
 * Subscribe to location updates
 * @param callback Callback function for location updates
 * @returns Subscription object
 */
export function watchLocation(
  callback: (location: LocationType) => void
): Location.LocationSubscription;

/**
 * Check if location services are enabled
 * @returns True if enabled, false otherwise
 */
export async function isLocationEnabled(): Promise<boolean>;

/**
 * Get the last known location
 * @returns Last known location or null
 */
export async function getLastKnownLocation(): Promise<LocationType | null>;

/**
 * Reverse geocode coordinates to address
 * @param latitude Latitude
 * @param longitude Longitude
 * @returns Address string or null
 */
export async function reverseGeocode(
  latitude: number,
  longitude: number
): Promise<string | null>;

/**
 * Geocode address to coordinates
 * @param address Address string
 * @returns Location or null
 */
export async function geocode(address: string): Promise<LocationType | null>;
