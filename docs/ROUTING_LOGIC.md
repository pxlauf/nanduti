# Routing Logic

## Overview

The routing system in Nanduti finds optimal transit routes between two points in Asunción's bus network. This document explains the algorithms and logic used.

## Route Finding Strategy

### 1. Direct Routes

The system first checks for direct lines that serve both the origin and destination stops.

**Algorithm:**
```
1. Get all lines serving the origin stop
2. Get all lines serving the destination stop
3. Find intersection of line sets
4. Return direct routes
```

**Example:**
- Origin: Estación Central
- Destination: Plaza de los Héroes
- Lines 1, 3, and 7 serve both stops
- These are returned as direct route options

### 2. Transfer Routes

If no direct routes exist, the system finds routes requiring one transfer.

**Algorithm:**
```
1. Find all stops reachable from origin (within walking distance)
2. For each reachable stop, find lines serving it
3. Find all stops reachable from destination (within walking distance)
4. For each destination stop, find lines serving it
5. Find intersections of line sets with a common transfer stop
6. Return transfer routes
```

**Example:**
- Origin: Stop A (served by Line 1)
- Destination: Stop D (served by Line 3)
- Transfer at Stop B (served by both Line 1 and Line 3)
- Route: A → B (Line 1) → B → D (Line 3)

## Distance Calculations

### Haversine Formula

The app uses the Haversine formula to calculate great-circle distances between two points on Earth:

```typescript
function calculateDistance(coord1, coord2): number {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (coord1.latitude * Math.PI) / 180;
  const φ2 = (coord2.latitude * Math.PI) / 180;
  const Δφ = ((coord2.latitude - coord1.latitude) * Math.PI) / 180;
  const Δλ = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}
```

### Walking Distance

Users can walk to nearby stops within a configurable radius (default: 500m). This is used to:
- Find nearest stops to user location
- Allow transfers between stops within walking distance

## Stop Search

### Nearby Stops

Finds stops within a specified radius from a location:

```typescript
function findNearbyStops(location, radius, maxStops) {
  const allStops = await fetchAllStops();
  const stopsWithDistance = allStops.map(stop => ({
    ...stop,
    distance: calculateDistance(location, stop)
  }));
  
  return stopsWithDistance
    .filter(stop => stop.distance <= radius)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, maxStops);
}
```

### Text Search

Performs fuzzy search on stop names:

```typescript
function searchStops(query) {
  const allStops = await fetchAllStops();
  const normalizedQuery = query.toLowerCase();
  
  return allStops.filter(stop =>
    stop.name.toLowerCase().includes(normalizedQuery) ||
    stop.neighborhood?.toLowerCase().includes(normalizedQuery)
  );
}
```

## Route Ranking

Routes are ranked based on multiple factors:

### Scoring Algorithm

```
Route Score = (Distance Weight × Normalized Distance) +
              (Transfers Weight × Transfer Count) +
              (Time Weight × Normalized Time)
```

**Weights:**
- Distance: 0.4
- Transfers: 0.4 (penalty per transfer)
- Time: 0.2

### Estimated Travel Time

Travel time is estimated based on:
- Number of stops on route
- Average time between stops (2 minutes)
- Transfer time (5 minutes per transfer)
- Walking time to/from stops (if applicable)

```typescript
function estimateTravelTime(stops: Stop[]): number {
  const travelTime = stops.length * 2; // 2 min per stop
  return travelTime;
}
```

## Map Rendering

### Polyline Parsing

GeoJSON LineString coordinates are parsed for map rendering:

```typescript
function parsePolyline(geojson: GeoJSON.LineString): LatLng[] {
  return geojson.coordinates.map(coord => ({
    latitude: coord[1],
    longitude: coord[0]
  }));
}
```

### Route Visualization

Routes are displayed on the map with:
- **Polylines**: Colored lines matching the line's color
- **Markers**: Stop markers with numbers indicating order
- **Current location**: Blue dot for user position

## Optimization Strategies

### Caching

- Cached stop data to reduce database queries
- Cached route results for frequent searches
- Pre-fetched nearby stops on location change

### Lazy Loading

- Stop details loaded on demand
- Route details fetched when selected
- Map tiles cached by the mapping library

### Debouncing

- Search input debounced (300ms)
- Location updates throttled (5 seconds)
- Map region changes debounced (500ms)

## Future Enhancements

### Real-time Data

- Integrate real-time bus locations
- Show estimated arrival times
- Service alerts and disruptions

### Advanced Routing

- Multi-transfer routes
- Time-based routing (rush hour vs off-peak)
- Accessibility considerations
- Route preferences (fewer transfers vs shorter distance)

### Machine Learning

- Predict optimal routes based on user behavior
- Learn from common trip patterns
- Suggest frequent routes
