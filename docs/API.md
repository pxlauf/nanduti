# API Reference

This document describes the API services used in the Nanduti Transit App.

## Services Overview

The app uses three main service layers:

1. **Supabase Service** - Database operations
2. **Location Service** - Device location and geocoding
3. **Routing Service** - Route finding and calculations

## Supabase Service

Location: `src/services/supabase.ts`

### Configuration

```typescript
import { supabase } from '@services/supabase';

// Automatic configuration from environment variables
// SUPABASE_URL and SUPABASE_ANON_KEY
```

### Methods

#### `fetchAllStops()`

Fetches all bus stops from the database.

```typescript
async function fetchAllStops(): Promise<Stop[]>
```

**Returns:** Array of Stop objects

**Example:**
```typescript
const stops = await fetchAllStops();
console.log(`Found ${stops.length} stops`);
```

---

#### `fetchStopById(id)`

Fetches a single stop by its ID.

```typescript
async function fetchStopById(id: number): Promise<Stop | null>
```

**Parameters:**
- `id` (number): Stop ID

**Returns:** Stop object or null if not found

**Example:**
```typescript
const stop = await fetchStopById(123);
if (stop) {
  console.log(stop.name);
}
```

---

#### `searchStops(query)`

Searches stops by name or neighborhood.

```typescript
async function searchStops(query: string): Promise<Stop[]>
```

**Parameters:**
- `query` (string): Search query

**Returns:** Array of matching Stop objects

**Example:**
```typescript
const stops = await searchStops('Plaza');
// Returns stops containing "Plaza" in name or neighborhood
```

---

#### `fetchAllLines()`

Fetches all transit lines.

```typescript
async function fetchAllLines(): Promise<Line[]>
```

**Returns:** Array of Line objects

**Example:**
```typescript
const lines = await fetchAllLines();
lines.forEach(line => {
  console.log(`${line.name}: ${line.color}`);
});
```

---

#### `fetchLineById(id)`

Fetches a single line by its ID.

```typescript
async function fetchLineById(id: number): Promise<Line | null>
```

**Parameters:**
- `id` (number): Line ID

**Returns:** Line object or null if not found

**Example:**
```typescript
const line = await fetchLineById(1);
console.log(line.name); // "Línea 1"
```

---

#### `fetchRoutesByLine(lineId)`

Fetches all routes (stops) for a given line, in order.

```typescript
async function fetchRoutesByLine(lineId: number): Promise<RouteStop[]>
```

**Parameters:**
- `lineId` (number): Line ID

**Returns:** Array of RouteStop objects with stop details

**Example:**
```typescript
const routes = await fetchRoutesByLine(1);
routes.forEach(route => {
  console.log(`${route.order}: ${route.stop.name}`);
});
```

---

#### `fetchPolylineByLine(lineId)`

Fetches the GeoJSON polyline for a line's route.

```typescript
async function fetchPolylineByLine(lineId: number): Promise<LinePolyline | null>
```

**Parameters:**
- `lineId` (number): Line ID

**Returns:** LinePolyline object with GeoJSON geometry

**Example:**
```typescript
const polyline = await fetchPolylineByLine(1);
if (polyline) {
  console.log(polyline.geojson.coordinates.length); // Number of points
}
```

---

#### `fetchAllPolylines()`

Fetches all line polylines.

```typescript
async function fetchAllPolylines(): Promise<LinePolyline[]>
```

**Returns:** Array of LinePolyline objects

**Example:**
```typescript
const polylines = await fetchAllPolylines();
// Useful for displaying all routes on map
```

---

#### `fetchLinesByStop(stopId)`

Fetches all lines that serve a specific stop.

```typescript
async function fetchLinesByStop(stopId: number): Promise<Line[]>
```

**Parameters:**
- `stopId` (number): Stop ID

**Returns:** Array of Line objects

**Example:**
```typescript
const lines = await fetchLinesByStop(123);
console.log(`Stop served by ${lines.length} lines`);
```

---

## Location Service

Location: `src/services/location.ts`

### Configuration

Uses Expo Location SDK with runtime permission requests.

### Methods

#### `requestLocationPermission()`

Requests location permissions from the user.

```typescript
async function requestLocationPermission(): Promise<boolean>
```

**Returns:** true if permission granted, false otherwise

**Example:**
```typescript
const hasPermission = await requestLocationPermission();
if (!hasPermission) {
  alert('Location permission required');
}
```

---

#### `getCurrentLocation()`

Gets the current device location.

```typescript
async function getCurrentLocation(): Promise<Location | null>
```

**Returns:** Current location or null if unavailable

**Example:**
```typescript
const location = await getCurrentLocation();
if (location) {
  console.log(`${location.latitude}, ${location.longitude}`);
}
```

---

#### `watchLocation(callback)`

Subscribes to location updates.

```typescript
function watchLocation(
  callback: (location: Location) => void
): LocationSubscription
```

**Parameters:**
- `callback` (function): Called with each location update

**Returns:** Subscription object (call `remove()` to unsubscribe)

**Example:**
```typescript
const subscription = watchLocation((location) => {
  console.log('Location updated:', location);
});

// Later, unsubscribe
subscription.remove();
```

---

#### `isLocationEnabled()`

Checks if location services are enabled on the device.

```typescript
async function isLocationEnabled(): Promise<boolean>
```

**Returns:** true if enabled, false otherwise

**Example:**
```typescript
const enabled = await isLocationEnabled();
if (!enabled) {
  alert('Please enable location services');
}
```

---

#### `getLastKnownLocation()`

Gets the last known location without making a new request.

```typescript
async function getLastKnownLocation(): Promise<Location | null>
```

**Returns:** Last known location or null

**Example:**
```typescript
const location = await getLastKnownLocation();
// Faster than getCurrentLocation() but may be stale
```

---

#### `reverseGeocode(latitude, longitude)`

Converts coordinates to an address string.

```typescript
async function reverseGeocode(
  latitude: number,
  longitude: number
): Promise<string | null>
```

**Parameters:**
- `latitude` (number): Latitude
- `longitude` (number): Longitude

**Returns:** Address string or null

**Example:**
```typescript
const address = await reverseGeocode(-25.268, -57.565);
// Returns: "Asunción, Paraguay"
```

---

#### `geocode(address)`

Converts an address to coordinates.

```typescript
async function geocode(address: string): Promise<Location | null>
```

**Parameters:**
- `address` (string): Address string

**Returns:** Location or null

**Example:**
```typescript
const location = await geocode('Plaza de los Héroes, Asunción');
console.log(location?.latitude, location?.longitude);
```

---

## Routing Service

Location: `src/services/routing.ts`

### Methods

#### `findRoutes(origin, destination)`

Finds routes between two stops.

```typescript
async function findRoutes(
  origin: Stop,
  destination: Stop
): Promise<RouteSuggestion[]>
```

**Parameters:**
- `origin` (Stop): Origin stop
- `destination` (Stop): Destination stop

**Returns:** Array of route suggestions, ranked by optimality

**Example:**
```typescript
const routes = await findRoutes(originStop, destinationStop);
routes[0].line.name; // Best line to take
routes[0].distance; // Total distance in meters
```

---

#### `findRoutesToStop(origin, destination)`

Finds routes from a location to a stop.

```typescript
async function findRoutesToStop(
  origin: Location,
  destination: Stop
): Promise<RouteSuggestion[]>
```

**Parameters:**
- `origin` (Location): Origin coordinates
- `destination` (Stop): Destination stop

**Returns:** Array of route suggestions

**Example:**
```typescript
const userLocation = { latitude: -25.268, longitude: -57.565 };
const routes = await findRoutesToStop(userLocation, destinationStop);
```

---

#### `findRoutesFromStop(origin, destination)`

Finds routes from a stop to a location.

```typescript
async function findRoutesFromStop(
  origin: Stop,
  destination: Location
): Promise<RouteSuggestion[]>
```

**Parameters:**
- `origin` (Stop): Origin stop
- `destination` (Location): Destination coordinates

**Returns:** Array of route suggestions

---

#### `findDirectLines(originId, destinationId)`

Finds direct lines that serve both stops.

```typescript
async function findDirectLines(
  origin: number,
  destination: number
): Promise<Line[]>
```

**Parameters:**
- `origin` (number): Origin stop ID
- `destination` (number): Destination stop ID

**Returns:** Array of direct lines

**Example:**
```typescript
const directLines = await findDirectLines(1, 5);
if (directLines.length > 0) {
  console.log('No transfer needed!');
}
```

---

#### `findTransferRoutes(originId, destinationId)`

Finds routes requiring transfers.

```typescript
async function findTransferRoutes(
  origin: number,
  destination: number
): Promise<RouteSuggestion[]>
```

**Parameters:**
- `origin` (number): Origin stop ID
- `destination` (number): Destination stop ID

**Returns:** Array of route suggestions with transfers

---

#### `findNearbyStops(location, radius, maxStops)`

Finds stops within a given radius.

```typescript
async function findNearbyStops(
  location: Location,
  radius: number,
  maxStops: number
): Promise<Stop[]>
```

**Parameters:**
- `location` (Location): Center location
- `radius` (number): Search radius in meters
- `maxStops` (number): Maximum stops to return

**Returns:** Array of nearby stops, sorted by distance

**Example:**
```typescript
const nearby = await findNearbyStops(
  { latitude: -25.268, longitude: -57.565 },
  500,  // 500 meters
  10    // Max 10 stops
);
```

---

#### `estimateTravelTime(stops)`

Estimates travel time for a route.

```typescript
function estimateTravelTime(stops: Stop[]): number
```

**Parameters:**
- `stops` (Stop[]): Array of stops on route

**Returns:** Estimated time in minutes

**Example:**
```typescript
const time = estimateTravelTime(routeStops);
console.log(`~${time} minutes`);
```

---

#### `findOptimalRoute(suggestions)`

Finds the best route from suggestions.

```typescript
function findOptimalRoute(suggestions: RouteSuggestion[]): RouteSuggestion | null
```

**Parameters:**
- `suggestions` (RouteSuggestion[]): Array of route suggestions

**Returns:** Best route suggestion or null

**Example:**
```typescript
const best = findOptimalRoute(routeSuggestions);
if (best) {
  console.log(`Take ${best.line.name}`);
}
```

---

## Type Definitions

### Stop

```typescript
interface Stop {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  neighborhood?: string;
}
```

### Line

```typescript
interface Line {
  id: number;
  name: string;
  description?: string;
  color: string;
}
```

### Route

```typescript
interface Route {
  id: number;
  line_id: number;
  stop_id: number;
  order: number;
}
```

### RouteStop

```typescript
interface RouteStop extends Route {
  stop: Stop;
}
```

### LinePolyline

```typescript
interface LinePolyline {
  id: number;
  line_id: number;
  geojson: GeoJSON.LineString;
}
```

### Location

```typescript
interface Location {
  latitude: number;
  longitude: number;
}
```

### RouteSuggestion

```typescript
interface RouteSuggestion {
  line: Line;
  stops: Stop[];
  distance: number;
  estimatedTime?: number;
}
```

### MapRegion

```typescript
interface MapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}
```

---

## Error Handling

All async functions may throw errors. Wrap calls in try-catch:

```typescript
try {
  const stops = await fetchAllStops();
} catch (error) {
  console.error('Failed to fetch stops:', error);
  // Handle error (show alert, retry, etc.)
}
```

Common error types:
- **Network errors:** Connection issues, timeout
- **Permission errors:** Location access denied
- **Not found errors:** Invalid IDs
- **Validation errors:** Invalid parameters

---

## Rate Limiting

### Supabase
- Depends on your Supabase plan
- Monitor via Supabase Dashboard

### Location Services
- No explicit rate limiting
- Respect battery life by avoiding frequent updates

### Routing Calculations
- Client-side calculations (no API rate limits)
- Consider caching results

---

## Best Practices

1. **Cache Results:** Store fetched data to reduce API calls
2. **Handle Errors:** Always wrap async calls in try-catch
3. **Loading States:** Show loading indicators during fetches
4. **Optimize Queries:** Fetch only needed data
5. **Batch Operations:** Use batch queries when possible
6. **Pagination:** Implement pagination for large datasets

---

## Future Enhancements

- Real-time bus locations
- Service alerts integration
- User authentication
- Route favorites
- Trip history
- Crowdsourced delays
