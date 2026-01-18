import { BusStop, Route } from '../types';
import { calculateDistance } from './location';

export const findBestRoute = (
  startStop: BusStop,
  endStop: BusStop,
  allRoutes: Route[]
): Route[] => {
  // Simple implementation - find routes that include both stops
  const routesWithStart = allRoutes.filter(route => 
    route.stops?.some(stop => stop.id === startStop.id)
  );
  
  const routesWithEnd = allRoutes.filter(route => 
    route.stops?.some(stop => stop.id === endStop.id)
  );
  
  // Find common routes
  const commonRoutes = routesWithStart.filter(route => 
    routesWithEnd.some(r => r.id === route.id)
  );
  
  if (commonRoutes.length > 0) {
    return commonRoutes;
  }
  
  // If no direct route, find transfer routes
  // This is a simplified version - would need more complex logic
  return [];
};

export const getRoutePath = (route: Route): { latitude: number; longitude: number }[] => {
  if (!route.stops || route.stops.length === 0) {
    return [];
  }
  
  return route.stops.map(stop => ({
    latitude: stop.latitude,
    longitude: stop.longitude,
  }));
};

export const calculateRouteDistance = (route: Route): number => {
  if (!route.stops || route.stops.length < 2) {
    return 0;
  }
  
  let totalDistance = 0;
  
  for (let i = 0; i < route.stops.length - 1; i++) {
    const stop1 = route.stops[i];
    const stop2 = route.stops[i + 1];
    totalDistance += calculateDistance(
      stop1.latitude,
      stop1.longitude,
      stop2.latitude,
      stop2.longitude
    );
  }
  
  return totalDistance;
};