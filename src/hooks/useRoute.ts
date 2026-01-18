import { useState, useEffect } from 'react';
import { getStops, getRoutes, searchStops, searchRoutes } from '../services/supabase';
import { BusStop, Route } from '../types';

export const useRoute = () => {
  const [stops, setStops] = useState<BusStop[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [stopsData, routesData] = await Promise.all([
          getStops(),
          getRoutes(),
        ]);
        
        setStops(stopsData);
        setRoutes(routesData);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchStops = async (query: string) => {
    try {
      const results = await searchStops(query);
      setStops(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  const handleSearchRoutes = async (query: string) => {
    try {
      const results = await searchRoutes(query);
      setRoutes(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  return {
    stops,
    routes,
    isLoading,
    error,
    searchStops: handleSearchStops,
    searchRoutes: handleSearchRoutes,
  };
};