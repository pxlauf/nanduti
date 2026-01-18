import * as Location from 'expo-location';
import { Location as LocationType } from '../types';

export async function requestLocationPermission(): Promise<boolean> {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Error requesting location permission:', error);
    return false;
  }
}

export async function getCurrentLocation(): Promise<LocationType | null> {
  try {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      console.warn('Location permission not granted');
      return null;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  } catch (error) {
    console.error('Error getting current location:', error);
    return null;
  }
}

export async function watchLocation(
  callback: (location: LocationType) => void,
  options?: {
    distanceInterval?: number;
    timeInterval?: number;
  }
): Promise<Location.LocationSubscription | null> {
  try {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      console.warn('Location permission not granted');
      return null;
    }

    return await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        distanceInterval: options?.distanceInterval || 10,
        timeInterval: options?.timeInterval || 5000,
      },
      (location) => {
        callback({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }
    );
  } catch (error) {
    console.error('Error watching location:', error);
    return null;
  }
}

export async function getLastKnownLocation(): Promise<LocationType | null> {
  try {
    const location = await Location.getLastKnownPositionAsync();
    if (!location) {
      return null;
    }

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  } catch (error) {
    console.error('Error getting last known location:', error);
    return null;
  }
}
