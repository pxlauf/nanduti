# Nanduti Architecture

## Overview

Nanduti is a React Native/Expo mobile application that provides transit navigation for Asunción, Paraguay. The app follows a clean architecture with clear separation of concerns.

## Architecture Layers

### Presentation Layer
- **Screens**: Main application screens (HomeScreen, RouteDetailScreen)
- **Components**: Reusable UI components (Map, SearchBar, Cards, BottomSheet)
- **Navigation**: React Navigation setup for screen transitions

### Business Logic Layer
- **Hooks**: Custom React hooks for location and routing logic
- **Services**: External service integrations (Supabase, Location, Routing)
- **Utils**: Utility functions (distance calculations, polyline parsing)

### Data Layer
- **Supabase**: PostgreSQL database with transit data
- **Types**: TypeScript type definitions for data models
- **Constants**: App-wide constants (colors, locations, settings)

## Data Flow

```
User Interaction
    ↓
Screen Component
    ↓
Custom Hook (useLocation, useRoute)
    ↓
Service Layer (Supabase, Location, Routing)
    ↓
Utils (Distance, Polyline parsing)
    ↓
Data Display (Components)
```

## Component Hierarchy

```
App (Navigation Container)
└── TabNavigator
    └── HomeScreen
        ├── Map
        ├── SearchBar
        └── BottomSheet
            ├── StopCard
            └── RouteCard
    └── RouteDetailScreen
        ├── Map
        └── StopsList
```

## State Management

The app uses React's built-in state management with hooks:

- **useState**: Local component state
- **useEffect**: Side effects and data fetching
- **useContext**: For future global state needs
- **Custom Hooks**: Encapsulated business logic

## Key Services

### Supabase Service
- Database CRUD operations
- Real-time subscriptions (future)
- Authentication (future)

### Location Service
- Permission handling
- Current location tracking
- Geocoding/reverse geocoding

### Routing Service
- Route finding algorithms
- Distance calculations
- Stop search

## Database Schema

### Stops Table
```typescript
{
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  neighborhood?: string;
}
```

### Lines Table
```typescript
{
  id: number;
  name: string;
  description?: string;
  color: string;
}
```

### Routes Table
```typescript
{
  id: number;
  line_id: number;
  stop_id: number;
  order: number;
}
```

### Line Polylines Table
```typescript
{
  id: number;
  line_id: number;
  geojson: GeoJSON.LineString;
}
```

## Navigation Structure

The app uses React Navigation with a tab-based structure:

```
Root
└── Tab Navigator
    ├── Home Tab (Map)
    ├── Routes Tab (Route planning)
    └── Settings Tab (Preferences)
```

## Security Considerations

- Environment variables for sensitive data (Supabase keys)
- Row Level Security (RLS) enabled on Supabase
- Location permission handling
- No sensitive data in client code

## Performance Optimizations

- Lazy loading of route data
- Debounced search input
- Optimized map rendering with clustering (future)
- Image caching for map markers

## Future Enhancements

- Redux or Zustand for complex state management
- Offline data caching with AsyncStorage
- Push notifications for service alerts
- Real-time bus tracking integration
- User favorites and recent routes
