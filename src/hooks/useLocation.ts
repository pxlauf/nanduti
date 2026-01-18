import { useState, useEffect, useCallback } from 'react';
import { Location as LocationType } from '../types';
import { getCurrentLocation, watchLocation, getLastKnownLocation } from '../services/location';

interface UseLocationResult {
  location: LocationType | null;
  loading: boolean;
  error: string | null;
  requestPermission: () => Promise<void>;
  refreshLocation: () => Promise<void>;
}

export function useLocation(): UseLocationResult {
  const [location, setLocation] = useState<LocationType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const requestPermission = useCallback(async () => {
    try {
      setLoading(true);
      const currentLocation = await getCurrentLocation();
      if (currentLocation) {
        setLocation(currentLocation);
        setError(null);
      } else {
        setError('No se pudo obtener la ubicación');
      }
    } catch (err) {
      setError('Error al obtener ubicación');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshLocation = useCallback(async () => {
    await requestPermission();
  }, [requestPermission]);

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  return {
    location,
    loading,
    error,
    requestPermission,
    refreshLocation,
  };
}

interface UseWatchLocationResult extends UseLocationResult {
  stopWatching: () => void;
  isWatching: boolean;
}

export function useWatchLocation(updateInterval?: number): UseWatchLocationResult {
  const [location, setLocation] = useState<LocationType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isWatching, setIsWatching] = useState<boolean>(false);
  const [subscription, setSubscription] = useState<any>(null);

  const requestPermission = useCallback(async () => {
    try {
      setLoading(true);
      const currentLocation = await getCurrentLocation();
      if (currentLocation) {
        setLocation(currentLocation);
        setError(null);
      } else {
        setError('No se pudo obtener la ubicación');
      }
    } catch (err) {
      setError('Error al obtener ubicación');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshLocation = useCallback(async () => {
    await requestPermission();
  }, [requestPermission]);

  const startWatching = useCallback(async () => {
    if (subscription) {
      subscription.remove();
    }

    try {
      const sub = await watchLocation(
        (loc) => {
          setLocation(loc);
          setError(null);
          setLoading(false);
        },
        { timeInterval: updateInterval || 5000 }
      );

      setSubscription(sub);
      setIsWatching(true);
    } catch (err) {
      setError('Error al observar ubicación');
      console.error(err);
      setIsWatching(false);
    }
  }, [subscription, updateInterval]);

  const stopWatching = useCallback(() => {
    if (subscription) {
      subscription.remove();
      setSubscription(null);
      setIsWatching(false);
    }
  }, [subscription]);

  useEffect(() => {
    requestPermission();
    startWatching();

    return () => {
      stopWatching();
    };
  }, []);

  return {
    location,
    loading,
    error,
    requestPermission,
    refreshLocation,
    stopWatching,
    isWatching,
  };
}
