# Routing Logic

## Overview

This document describes the routing logic used in the Nanduti app to find optimal bus routes between stops.

## Data Model

### Bus Stop
```typescript
interface BusStop {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  lines?: Line[];
}
```

### Route
```typescript
interface Route {
  id: string;
  name: string;
  description: string;
  color: string;
  stops?: BusStop[];
  path?: { latitude: number; longitude: number }[];
  distance?: number;
}
```

### Line
```typescript
interface Line {
  id: string;
  name: string;
  description: string;
  color: string;
}
```

## Basic Routing Algorithm

The current implementation uses a simple approach:

1. **Direct Route Check**: Find routes that include both start and end stops
2. **Transfer Route Check**: If no direct route, find routes that can be connected via transfer stops

### Direct Route Finding

```typescript
const findBestRoute = (
  startStop: BusStop,
  endStop: BusStop,
  allRoutes: Route[]
): Route[] => {
  // Find routes that include both stops
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
  
  return commonRoutes;
}
```

## Distance Calculation

The app uses the Haversine formula to calculate distances between geographic coordinates:

```typescript
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
```

## Route Path Generation

Route paths are generated from the sequence of stops:

```typescript
export const getRoutePath = (route: Route): { latitude: number; longitude: number }[] => {
  if (!route.stops || route.stops.length === 0) {
    return [];
  }
  
  return route.stops.map(stop => ({
    latitude: stop.latitude,
    longitude: stop.longitude,
  }));
}
```

## Future Enhancements

### Advanced Routing Algorithms

1. **Dijkstra's Algorithm**: Find shortest path based on distance
2. **A* Algorithm**: Optimized path finding with heuristics
3. **Multi-modal Routing**: Combine walking and bus routes
4. **Time-based Routing**: Consider bus schedules and frequencies

### Transfer Optimization

1. **Minimize Transfers**: Find routes with fewest transfers
2. **Transfer Hubs**: Prioritize major transfer points
3. **Transfer Time**: Estimate time between transfers

### Real-time Data Integration

1. **Live Bus Positions**: Show real-time bus locations
2. **Service Alerts**: Display delays and disruptions
3. **Predictive Arrival**: Estimate arrival times

### User Preferences

1. **Favorite Routes**: Save frequently used routes
2. **Accessibility**: Filter for accessible routes
3. **Cost Optimization**: Find cheapest routes

## Performance Considerations

1. **Data Caching**: Cache route and stop data locally
2. **Lazy Loading**: Load data as needed
3. **Background Updates**: Refresh data periodically
4. **Offline Mode**: Provide basic functionality without network

## Testing Strategy

1. **Unit Tests**: Test individual routing functions
2. **Integration Tests**: Test complete routing workflows
3. **Performance Tests**: Measure routing calculation speed
4. **Edge Cases**: Test with unusual or extreme inputs