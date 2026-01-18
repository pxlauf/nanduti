import { calculateDistance } from '../services/location';

export const formatDistance = (distance: number): string => {
  if (distance < 1) {
    return `${Math.round(distance * 1000)} m`;
  }
  return `${distance.toFixed(2)} km`;
};

export const getNearestStop = (
  latitude: number,
  longitude: number,
  stops: any[]
): any | null => {
  if (stops.length === 0) return null;
  
  let nearestStop = stops[0];
  let minDistance = calculateDistance(
    latitude,
    longitude,
    nearestStop.latitude,
    nearestStop.longitude
  );
  
  for (const stop of stops) {
    const distance = calculateDistance(
      latitude,
      longitude,
      stop.latitude,
      stop.longitude
    );
    
    if (distance < minDistance) {
      minDistance = distance;
      nearestStop = stop;
    }
  }
  
  return nearestStop;
};