# API Documentation

## Overview

This document describes the API endpoints and data structures used by the Nanduti app.

## Base URL

The app uses Supabase as the backend service. All API calls are made through the Supabase client.

## Authentication

The app uses Supabase's anonymous authentication:

```typescript
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

## Endpoints

### Stops

#### Get All Stops

```typescript
const { data, error } = await supabase
  .from('stops')
  .select('*');
```

**Response**:
```typescript
{
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  lines?: Line[];
}[]
```

#### Search Stops

```typescript
const { data, error } = await supabase
  .from('stops')
  .select('*')
  .ilike('name', `%${query}%`);
```

**Parameters**:
- `query`: Search string

**Response**: Array of matching stops

#### Get Stop Details

```typescript
const { data, error } = await supabase
  .from('stops')
  .select('*, lines(*)')
  .eq('id', stopId)
  .single();
```

**Parameters**:
- `stopId`: Stop ID

**Response**: Stop with associated lines

### Routes

#### Get All Routes

```typescript
const { data, error } = await supabase
  .from('routes')
  .select('*');
```

**Response**:
```typescript
{
  id: string;
  name: string;
  description: string;
  color: string;
  stops?: BusStop[];
  path?: { latitude: number; longitude: number }[];
  distance?: number;
}[]
```

#### Search Routes

```typescript
const { data, error } = await supabase
  .from('routes')
  .select('*')
  .ilike('name', `%${query}%`);
```

**Parameters**:
- `query`: Search string

**Response**: Array of matching routes

#### Get Route Details

```typescript
const { data, error } = await supabase
  .from('routes')
  .select('*, stops(*)')
  .eq('id', routeId)
  .single();
```

**Parameters**:
- `routeId`: Route ID

**Response**: Route with associated stops

### Lines

#### Get All Lines

```typescript
const { data, error } = await supabase
  .from('lines')
  .select('*');
```

**Response**:
```typescript
{
  id: string;
  name: string;
  description: string;
  color: string;
}[]
```

#### Get Line Details

```typescript
const { data, error } = await supabase
  .from('lines')
  .select('*, stops(*)')
  .eq('id', lineId)
  .single();
```

**Parameters**:
- `lineId`: Line ID

**Response**: Line with associated stops

## Data Structures

### BusStop

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

### Location

```typescript
interface Location {
  latitude: number;
  longitude: number;
  accuracy?: number;
}
```

## Error Handling

All API calls should handle errors appropriately:

```typescript
const { data, error } = await supabase
  .from('stops')
  .select('*');

if (error) {
  console.error('Error fetching stops:', error);
  // Handle error appropriately
  return [];
}

return data || [];
```

## Rate Limiting

Supabase has built-in rate limiting. The app should:

1. Implement client-side caching
2. Use debouncing for search queries
3. Handle rate limit errors gracefully
4. Provide user feedback when rate limited

## Caching Strategy

The app implements a simple caching strategy:

1. **Data Fetching**: Fetch data on app startup
2. **Search Results**: Cache search results temporarily
3. **Offline Mode**: Use cached data when offline
4. **Background Refresh**: Refresh data periodically

## Authentication Flow

The app uses anonymous authentication:

1. **Initialization**: Create Supabase client with anonymous key
2. **Data Access**: Use Row-Level Security (RLS) for data access
3. **User Sessions**: No user accounts in current version

## Future API Enhancements

### Real-time Updates

```typescript
// Subscribe to real-time updates
const subscription = supabase
  .channel('stops-updates')
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'stops'
  }, payload => {
    console.log('Change received!', payload);
  })
  .subscribe();
```

### Advanced Search

```typescript
// Geospatial search
const { data, error } = await supabase
  .rpc('find_nearby_stops', {
    lat: latitude,
    lon: longitude,
    radius: 0.5 // 500 meters
  });
```

### User Preferences

```typescript
// Save user preferences
const { data, error } = await supabase
  .from('user_preferences')
  .upsert({
    user_id: 'anonymous',
    favorite_stops: [...],
    theme: 'light'
  });
```

## API Versioning

The current API is version 1.0. Future versions will:

1. Maintain backward compatibility where possible
2. Use semantic versioning
3. Provide migration guides for breaking changes

## Testing the API

### Manual Testing

Use the Supabase dashboard to:

1. Browse table data
2. Run custom queries
3. Test RLS policies

### Automated Testing

Implement API tests using Jest:

```typescript
describe('Stops API', () => {
  it('should fetch all stops', async () => {
    const stops = await getStops();
    expect(stops.length).toBeGreaterThan(0);
  });

  it('should search stops', async () => {
    const results = await searchStops('Central');
    expect(results.length).toBeGreaterThan(0);
  });
});
```

## Performance Considerations

1. **Query Optimization**: Use proper indexes on frequently queried columns
2. **Data Fetching**: Fetch only necessary data
3. **Pagination**: Implement pagination for large datasets
4. **Batch Requests**: Combine multiple requests when possible

## Security Considerations

1. **RLS Policies**: Implement proper Row-Level Security
2. **Data Validation**: Validate all input data
3. **Error Handling**: Don't expose sensitive error details
4. **Rate Limiting**: Protect against abuse

## Monitoring and Analytics

Track API usage and performance:

1. **Request Volume**: Monitor number of API calls
2. **Response Times**: Track API response times
3. **Error Rates**: Monitor error rates
4. **Usage Patterns**: Analyze how users interact with the API

## Troubleshooting

### Common API Issues

1. **Connection Errors**: Check network connectivity and Supabase URL
2. **Authentication Errors**: Verify Supabase anonymous key
3. **Permission Errors**: Check RLS policies
4. **Rate Limiting**: Implement client-side caching

### Debugging Tips

1. **Enable Debug Mode**: Set `DEBUG_MODE=true` in `.env`
2. **Log API Calls**: Add logging for API requests and responses
3. **Use Supabase Dashboard**: Monitor API usage and errors
4. **Check Network Tab**: Use browser dev tools to inspect network requests