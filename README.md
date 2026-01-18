# Nanduti - Asunción Bus Transit App

## Overview

Nanduti is a React Native/Expo application for navigating Asunción's bus transit system. The app provides real-time bus route information, stop locations, and route planning.

## Features

- **Interactive Map**: View bus stops and routes on a map
- **Search Functionality**: Find stops and routes by name
- **Route Planning**: Find optimal routes between stops
- **Real-time Location**: Use device location to find nearby stops
- **Offline Support**: Access cached data when offline

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation
- **Maps**: React Native Maps
- **Backend**: Supabase
- **State Management**: React Hooks
- **Styling**: StyleSheet with TypeScript
- **Type Safety**: TypeScript

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Expo CLI
- Android Studio or Xcode

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/nanduti.git
   cd nanduti
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your Supabase credentials.

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

5. Run the app:
   ```bash
   # Android
   npm run android
   
   # iOS
   npm run ios
   
   # Web
   npm run web
   ```

## Project Structure

```
nanduti/
├── app.json                     # Expo configuration
├── App.tsx                      # Root navigation
├── package.json                 # Dependencies
├── tsconfig.json               # TypeScript config
├── babel.config.js             # Babel config
├── .gitignore
├── .env.example
│
├── src/
│   ├── components/             # Reusable UI components
│   ├── screens/                # Screen components
│   ├── services/               # Data access and business logic
│   ├── types/                  # TypeScript interfaces
│   ├── utils/                  # Utility functions
│   ├── hooks/                  # Custom React hooks
│   └── styles/                 # Global styles and themes
│
├── assets/                     # Static assets
│   ├── icons/                  # App icons
│   └── splash.png              # Splash screen
│
└── docs/                       # Documentation
```

## Key Components

### Map Component

The main map view showing bus stops, routes, and user location:

```typescript
import { Map } from './src/components/Map';

<Map
  stops={stops}
  routes={routes}
  userLocation={location}
  onMarkerPress={handleMarkerPress}
/>
```

### Search Functionality

Search for stops and routes:

```typescript
import { SearchBar } from './src/components/SearchBar';

<SearchBar
  value={searchQuery}
  onChangeText={setSearchQuery}
  onSubmit={handleSearch}
/>
```

### Route Planning

Find optimal routes between stops:

```typescript
import { findBestRoute } from './src/services/routing';

const routes = findBestRoute(startStop, endStop, allRoutes);
```

## Data Model

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

## Services

### Supabase Service

Handles all data access to the Supabase backend:

```typescript
import { getStops, getRoutes, searchStops } from './src/services/supabase';

const stops = await getStops();
const routes = await getRoutes();
```

### Location Service

Manages device location and distance calculations:

```typescript
import { getCurrentLocation, calculateDistance } from './src/services/location';

const location = await getCurrentLocation();
const distance = calculateDistance(lat1, lon1, lat2, lon2);
```

### Routing Service

Provides route finding and path calculations:

```typescript
import { findBestRoute, getRoutePath } from './src/services/routing';

const bestRoutes = findBestRoute(startStop, endStop, allRoutes);
const path = getRoutePath(route);
```

## Hooks

### useLocation

Manages device location state:

```typescript
import { useLocation } from './src/hooks/useLocation';

const { location, error, isLoading } = useLocation();
```

### useRoute

Manages route and stop data:

```typescript
import { useRoute } from './src/hooks/useRoute';

const { stops, routes, isLoading, error, searchStops, searchRoutes } = useRoute();
```

## Styling

The app uses a consistent styling approach:

```typescript
import { StyleSheet } from 'react-native';
import { colors } from './src/styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  text: {
    color: colors.text,
    fontSize: 16,
  },
});
```

## Navigation

The app uses React Navigation with a bottom tab navigator:

```typescript
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

<Tab.Navigator>
  <Tab.Screen name="Home" component={HomeScreen} />
  <Tab.Screen name="RouteDetail" component={RouteDetailScreen} />
</Tab.Navigator>
```

## Environment Variables

The app uses the following environment variables:

```env
# Supabase configuration
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key

# Mapbox access token (optional)
MAPBOX_ACCESS_TOKEN=your-mapbox-token

# Development settings
DEBUG_MODE=true
```

## Development Workflow

1. **Feature Development**: Create feature branches
2. **Code Review**: Submit pull requests for review
3. **Testing**: Run tests and manual testing
4. **Deployment**: Merge to main branch and deploy

## Testing

Run tests with:

```bash
npm test
```

Lint code with:

```bash
npm run lint
```

Type check with:

```bash
npm run typecheck
```

## Deployment

Build and deploy the app:

```bash
# Android
expo build:android

# iOS
expo build:ios

# Publish OTA updates
expo publish
```

## Documentation

- **Architecture**: `docs/ARCHITECTURE.md`
- **Routing Logic**: `docs/ROUTING_LOGIC.md`
- **Setup Guide**: `docs/SETUP.md`
- **Deployment Guide**: `docs/DEPLOY.md`
- **API Documentation**: `docs/API.md`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and support, please contact the development team or submit an issue on GitHub.

## Roadmap

- Real-time bus tracking
- Offline route planning
- User accounts and favorites
- Accessibility features
- Multi-language support

## Acknowledgements

- Asunción transit authorities for route data
- OpenStreetMap contributors for map data
- Expo and React Native communities for development tools