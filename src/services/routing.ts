import { Stop, Line, RouteSuggestion, TravelRoute, Location as LocationType, RouteStep } from '../types';
import { fetchRoutesByLine, fetchLinesByStop } from './supabase';
import { calculateDistance, calculateWalkingTime } from '../utils/distance';
import { SEARCH_RADIUS } from '../utils/constants';

const BUS_SPEED = 20; // km/h
const BUS_SPEED_MS = BUS_SPEED * 1000 / 3600; // m/s
const MAX_TRANSFER_WALKING_DISTANCE = 500; // meters

export async function findRoutes(
  origin: Stop | LocationType,
  destination: Stop,
  allStops: Stop[]
): Promise<TravelRoute[]> {
  const routes: TravelRoute[] = [];

  // Find nearby stops if origin is a location
  const originStop = 'id' in origin ? origin : findNearestStop(origin, allStops);

  if (!originStop) {
    return routes;
  }

  // Find direct routes
  const directRoutes = await findDirectRoutes(originStop, destination, allStops);
  routes.push(...directRoutes);

  // Find transfer routes
  const transferRoutes = await findTransferRoutes(originStop, destination, allStops);
  routes.push(...transferRoutes);

  return routes.sort((a, b) => a.totalTime - b.totalTime);
}

function findNearestStopToLocation(location: LocationType, stops: Stop[]): Stop | null {
  if (stops.length === 0) return null;

  let nearest = stops[0];
  let minDistance = calculateDistance(location, stops[0]);

  for (let i = 1; i < stops.length; i++) {
    const distance = calculateDistance(location, stops[i]);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = stops[i];
    }
  }

  return minDistance <= SEARCH_RADIUS ? nearest : null;
}

export function findNearestStop(location: LocationType, stops: Stop[]): Stop | null {
  return findNearestStopToLocation(location, stops);
}

async function findDirectRoutes(
  origin: Stop,
  destination: Stop,
  allStops: Stop[]
): Promise<TravelRoute[]> {
  const routes: TravelRoute[] = [];

  try {
    // Get lines that serve the origin stop
    const originLines = await fetchLinesByStop(origin.id);

    // Get lines that serve the destination stop
    const destLines = await fetchLinesByStop(destination.id);

    // Find common lines (direct routes)
    for (const line of originLines) {
      if (destLines.find(l => l.id === line.id)) {
        const route = await createDirectRoute(origin, destination, line, allStops);
        if (route) {
          routes.push(route);
        }
      }
    }
    } catch (error) {
    // Silently handle direct route errors
    }

    return routes;
}

async function createDirectRoute(
  origin: Stop,
  destination: Stop,
  line: Line,
  allStops: Stop[]
): Promise<TravelRoute | null> {
  try {
    const routeStops = await fetchRoutesByLine(line.id);

    const originRoute = routeStops.find(r => r.stop_id === origin.id);
    const destRoute = routeStops.find(r => r.stop_id === destination.id);

    if (!originRoute || !destRoute) {
      return null;
    }

    const originOrder = originRoute.order;
    const destOrder = destRoute.order;

    // Check if destination is after origin in the route
    if (destOrder <= originOrder) {
      return null;
    }

    // Calculate distance and time
    const stopsBetween = routeStops
      .filter(r => r.order >= originOrder && r.order <= destOrder)
      .map(r => r.stop)
      .sort((a, b) => {
        const idxA = routeStops.find(rs => rs.stop_id === a.id)?.order || 0;
        const idxB = routeStops.find(rs => rs.stop_id === b.id)?.order || 0;
        return idxA - idxB;
      });

    const walkingDistance = calculateDistance(origin, { latitude: origin.latitude, longitude: origin.longitude });
    const walkingTime = calculateWalkingTime(walkingDistance);

    let busDistance = 0;
    for (let i = 0; i < stopsBetween.length - 1; i++) {
      busDistance += calculateDistance(
        { latitude: stopsBetween[i].latitude, longitude: stopsBetween[i].longitude },
        { latitude: stopsBetween[i + 1].latitude, longitude: stopsBetween[i + 1].longitude }
      );
    }

    const busTime = Math.round((busDistance / BUS_SPEED_MS) / 60);
    const totalTime = walkingTime + busTime;

    const steps: RouteStep[] = [
      {
        type: 'walk',
        instruction: `Caminar ${Math.round(walkingDistance)}m hasta la parada ${origin.name}`,
        distance: Math.round(walkingDistance),
        duration: walkingTime,
      },
      {
        type: 'bus',
        instruction: `Tomar la línea ${line.name} hacia ${destination.name}`,
        line: line,
        duration: busTime,
      },
      {
        type: 'walk',
        instruction: `Bajarse en la parada ${destination.name}`,
        distance: 0,
        duration: 0,
      },
    ];

    return {
      id: `direct-${line.id}-${origin.id}-${destination.id}`,
      type: 'direct',
      origin,
      destination,
      steps,
      totalDistance: Math.round(walkingDistance + busDistance),
      totalTime,
      line,
    };
  } catch (error) {
    // Silently handle direct route creation errors
    return null;
  }
}

async function findTransferRoutes(
  origin: Stop,
  destination: Stop,
  allStops: Stop[]
): Promise<TravelRoute[]> {
  const routes: TravelRoute[] = [];

  try {
    // Get lines for origin and destination
    const originLines = await fetchLinesByStop(origin.id);
    const destLines = await fetchLinesByStop(destination.id);

    // For each origin line, find stops that connect to destination lines
    for (const firstLine of originLines) {
      const firstLineStops = await fetchRoutesByLine(firstLine.id);

      for (const routeStop of firstLineStops) {
        // Skip if it's the origin stop
        if (routeStop.stop_id === origin.id) continue;

        // Check if this stop has destination lines
        const transferStop = routeStop.stop;
        const transferLines = await fetchLinesByStop(transferStop.id);

        // Find common lines
        const commonLines = transferLines.filter(tl => destLines.find(dl => dl.id === tl.id));

        for (const secondLine of commonLines) {
          const route = await createTransferRoute(
            origin,
            destination,
            firstLine,
            secondLine,
            transferStop,
            allStops
          );
          if (route) {
            routes.push(route);
          }
        }
      }
    }
  } catch (error) {
    // Silently handle transfer route errors
  }

  return routes;
}

async function createTransferRoute(
  origin: Stop,
  destination: Stop,
  firstLine: Line,
  secondLine: Line,
  transferStop: Stop,
  allStops: Stop[]
): Promise<TravelRoute | null> {
  try {
    const firstRouteStops = await fetchRoutesByLine(firstLine.id);
    const secondRouteStops = await fetchRoutesByLine(secondLine.id);

    // Calculate distances
    const firstWalkingDistance = calculateDistance(
      { latitude: origin.latitude, longitude: origin.longitude },
      { latitude: origin.latitude, longitude: origin.longitude }
    );

    let firstBusDistance = 0;
    let onFirstLine = false;
    for (const routeStop of firstRouteStops) {
      if (routeStop.stop_id === origin.id) {
        onFirstLine = true;
        continue;
      }
      if (routeStop.stop_id === transferStop.id) {
        break;
      }
      if (onFirstLine) {
        firstBusDistance += calculateDistance(
          { latitude: origin.latitude, longitude: origin.longitude },
          { latitude: routeStop.stop.latitude, longitude: routeStop.stop.longitude }
        );
      }
    }

    let secondBusDistance = 0;
    let onSecondLine = false;
    for (const routeStop of secondRouteStops) {
      if (routeStop.stop_id === transferStop.id) {
        onSecondLine = true;
        continue;
      }
      if (routeStop.stop_id === destination.id) {
        break;
      }
      if (onSecondLine) {
        secondBusDistance += calculateDistance(
          { latitude: transferStop.latitude, longitude: transferStop.longitude },
          { latitude: routeStop.stop.latitude, longitude: routeStop.stop.longitude }
        );
      }
    }

    const firstWalkingTime = calculateWalkingTime(firstWalkingDistance);
    const transferWalkingTime = 5; // Assume 5 minutes for transfer
    const firstBusTime = Math.round((firstBusDistance / BUS_SPEED_MS) / 60);
    const secondBusTime = Math.round((secondBusDistance / BUS_SPEED_MS) / 60);
    const totalTime = firstWalkingTime + firstBusTime + transferWalkingTime + secondBusTime;

    const steps: RouteStep[] = [
      {
        type: 'walk',
        instruction: `Caminar ${Math.round(firstWalkingDistance)}m hasta la parada ${origin.name}`,
        distance: Math.round(firstWalkingDistance),
        duration: firstWalkingTime,
      },
      {
        type: 'bus',
        instruction: `Tomar la línea ${firstLine.name} hacia ${transferStop.name}`,
        line: firstLine,
        duration: firstBusTime,
      },
      {
        type: 'transfer',
        instruction: `Transbordar en ${transferStop.name} a la línea ${secondLine.name}`,
        stop: transferStop,
        duration: transferWalkingTime,
      },
      {
        type: 'bus',
        instruction: `Tomar la línea ${secondLine.name} hacia ${destination.name}`,
        line: secondLine,
        duration: secondBusTime,
      },
      {
        type: 'walk',
        instruction: `Bajarse en la parada ${destination.name}`,
        distance: 0,
        duration: 0,
      },
    ];

    return {
      id: `transfer-${firstLine.id}-${secondLine.id}-${origin.id}-${destination.id}`,
      type: 'transfer',
      origin,
      destination,
      steps,
      totalDistance: Math.round(firstWalkingDistance + firstBusDistance + secondBusDistance),
      totalTime,
      firstLine,
      secondLine,
      transferStop,
    };
  } catch (error) {
    // Silently handle transfer route creation errors
    return null;
  }
}

export function estimateTravelTime(stops: Stop[]): number {
  let totalTime = 0;

  for (let i = 0; i < stops.length - 1; i++) {
    const distance = calculateDistance(
      { latitude: stops[i].latitude, longitude: stops[i].longitude },
      { latitude: stops[i + 1].latitude, longitude: stops[i + 1].longitude }
    );
    totalTime += (distance / BUS_SPEED_MS) / 60; // Convert to minutes
  }

  return Math.round(totalTime);
}

export async function findNearbyStops(
  location: LocationType,
  radius: number = SEARCH_RADIUS,
  maxStops: number = 10,
  allStops: Stop[]
): Promise<Array<Stop & { distance: number }>> {
  const stopsWithDistance = allStops.map(stop => ({
    ...stop,
    distance: calculateDistance(location, stop),
  }));

  return stopsWithDistance
    .filter(stop => stop.distance <= radius)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, maxStops);
}
