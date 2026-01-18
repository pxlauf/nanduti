import { Location, Stop } from '../types';

const EARTH_RADIUS = 6371000; // Earth's radius in meters
const WALKING_SPEED = 5; // km/h
const WALKING_SPEED_MS = WALKING_SPEED * 1000 / 3600; // m/s

export function calculateDistance(coord1: Location, coord2: Location): number {
  const toRad = (value: number) => (value * Math.PI) / 180;

  const lat1 = toRad(coord1.latitude);
  const lat2 = toRad(coord2.latitude);
  const deltaLat = toRad(coord2.latitude - coord1.latitude);
  const deltaLon = toRad(coord2.longitude - coord1.longitude);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS * c;
}

export function calculateWalkingTime(distance: number): number {
  return Math.round((distance / WALKING_SPEED_MS) / 60); // Convert to minutes
}

export function findStopsWithinRadius(
  location: Location,
  stops: Stop[],
  radius: number
): Array<Stop & { distance: number }> {
  return stops
    .map(stop => ({
      ...stop,
      distance: calculateDistance(location, stop)
    }))
    .filter(stop => stop.distance <= radius)
    .sort((a, b) => a.distance - b.distance);
}

export function findNearestStop(
  location: Location,
  stops: Stop[]
): (Stop & { distance: number }) | null {
  if (stops.length === 0) return null;

  const stopsWithDistance = stops.map(stop => ({
    ...stop,
    distance: calculateDistance(location, stop)
  }));

  return stopsWithDistance.reduce((nearest, current) =>
    current.distance < nearest.distance ? current : nearest
  );
}

export function calculateBearing(start: Location, end: Location): number {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const toDeg = (value: number) => (value * 180) / Math.PI;

  const startLat = toRad(start.latitude);
  const startLon = toRad(start.longitude);
  const endLat = toRad(end.latitude);
  const endLon = toRad(end.longitude);

  const deltaLon = endLon - startLon;

  const x = Math.sin(deltaLon) * Math.cos(endLat);
  const y =
    Math.cos(startLat) * Math.sin(endLat) -
    Math.sin(startLat) * Math.cos(endLat) * Math.cos(deltaLon);

  const bearing = Math.atan2(x, y);
  return ((toDeg(bearing) + 360) % 360);
}
