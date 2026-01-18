import { useState, useCallback } from 'react';
import { Stop, Line, RouteSuggestion, TravelRoute, Location as LocationType } from '../types';
import { findRoutes as findRoutesService } from '../services/routing';

interface UseRoutesResult {
  routes: TravelRoute[];
  loading: boolean;
  error: string | null;
  findRoutes: (origin: Stop | LocationType, destination: Stop, allStops: Stop[]) => Promise<void>;
  clearRoutes: () => void;
}

export function useRoute(): UseRoutesResult {
  const [routes, setRoutes] = useState<TravelRoute[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const findRoutes = useCallback(async (
    origin: Stop | LocationType,
    destination: Stop,
    allStops: Stop[]
  ) => {
    setLoading(true);
    setError(null);

    try {
      const foundRoutes = await findRoutesService(origin, destination, allStops);
      setRoutes(foundRoutes);

      if (foundRoutes.length === 0) {
        setError('No se encontraron rutas disponibles');
      }
    } catch (err) {
      setError('Error al buscar rutas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearRoutes = useCallback(() => {
    setRoutes([]);
    setError(null);
    setLoading(false);
  }, []);

  return {
    routes,
    loading,
    error,
    findRoutes,
    clearRoutes,
  };
}

interface UseNearbyStopsResult {
  stops: Stop[];
  loading: boolean;
  error: string | null;
  findNearbyStops: (location: LocationType, radius?: number, allStops?: Stop[]) => Promise<void>;
  clearStops: () => void;
}

export function useNearbyStops(): UseNearbyStopsResult {
  const [stops, setStops] = useState<Stop[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const findNearbyStops = useCallback(async (
    location: LocationType,
    radius: number = 500,
    allStops: Stop[] = []
  ) => {
    setLoading(true);
    setError(null);

    try {
      const { findNearbyStops: findNearby } = await import('../services/routing');
      const nearby = await findNearby(location, radius, 10, allStops);
      setStops(nearby.map(s => ({ id: s.id, name: s.name, latitude: s.latitude, longitude: s.longitude, neighborhood: s.neighborhood })));
    } catch (err) {
      setError('Error al buscar paradas cercanas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearStops = useCallback(() => {
    setStops([]);
    setError(null);
    setLoading(false);
  }, []);

  return {
    stops,
    loading,
    error,
    findNearbyStops,
    clearStops,
  };
}

interface UseLineDetailResult {
  line: Line | null;
  stops: Stop[];
  loading: boolean;
  error: string | null;
  loadLine: (lineId: number) => Promise<void>;
  clearLine: () => void;
}

export function useLineDetail(lineId?: number): UseLineDetailResult {
  const [line, setLine] = useState<Line | null>(null);
  const [stops, setStops] = useState<Stop[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadLine = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      const { fetchLineById, fetchRoutesByLine } = await import('../services/supabase');
      const [lineData, routesData] = await Promise.all([
        fetchLineById(id),
        fetchRoutesByLine(id),
      ]);

      setLine(lineData);
      setStops(routesData.map(r => r.stop).sort((a: Stop, b: Stop) => {
        const orderA = routesData.find((r: any) => r.stop_id === a.id)?.order || 0;
        const orderB = routesData.find((r: any) => r.stop_id === b.id)?.order || 0;
        return orderA - orderB;
      }));
    } catch (err) {
      setError('Error al cargar línea');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearLine = useCallback(() => {
    setLine(null);
    setStops([]);
    setError(null);
    setLoading(false);
  }, []);

  return {
    line,
    stops,
    loading,
    error,
    loadLine,
    clearLine,
  };
}
