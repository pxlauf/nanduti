# Nanduti App Architecture

## Overview

Nanduti is a React Native/Expo application for navigating Asunción's bus transit system. The app uses a clean architecture with separation of concerns between UI, business logic, and data access.

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

## Core Components

### Components

- **Map.tsx**: Main map view with markers and polylines
- **SearchBar.tsx**: Search interface for stops and routes
- **StopCard.tsx**: Display bus stop information
- **RouteCard.tsx**: Display route information
- **BottomSheet.tsx**: Modal for detailed views

### Screens

- **HomeScreen.tsx**: Main map view with search and stop selection
- **RouteDetailScreen.tsx**: Detailed view of a specific route

### Services

- **supabase.ts**: Supabase client and data access functions
- **location.ts**: Location services and distance calculations
- **routing.ts**: Route finding and path calculations

### Hooks

- **useLocation.ts**: Manages device location
- **useRoute.ts**: Manages route and stop data

## Data Flow

1. **Data Layer**: Supabase service fetches data from the backend
2. **Business Logic**: Services process and transform data
3. **State Management**: Custom hooks manage component state
4. **UI Layer**: Components render data and handle user interactions

## Navigation

The app uses React Navigation with a bottom tab navigator:
- Tab 1: Home (Map view)
- Tab 2: Route Details

## State Management

The app uses React's built-in state management with custom hooks:
- `useLocation`: Manages device location state
- `useRoute`: Manages route and stop data state

## Styling

The app uses a combination of:
- StyleSheet for component styles
- Global color constants in `src/styles/colors.ts`
- Consistent theming across components

## Type Safety

TypeScript is used throughout the app with interfaces defined in `src/types/index.ts`:
- `BusStop`: Bus stop information
- `Route`: Bus route information
- `Line`: Bus line information
- `Location`: Geographic coordinates

## External Dependencies

- **Expo**: Cross-platform framework
- **React Navigation**: Navigation library
- **React Native Maps**: Map display
- **Supabase**: Backend data access
- **React Native Bottom Sheet**: Modal interface

## Development Workflow

1. Install dependencies: `npm install`
2. Start development server: `expo start`
3. Run on Android: `expo start --android`
4. Run on iOS: `expo start --ios`

## Testing

The app includes basic TypeScript type checking and linting:
- Type checking: `npm run typecheck`
- Linting: `npm run lint`

## Future Enhancements

- Add unit testing with Jest
- Implement more sophisticated state management
- Add offline caching
- Implement user preferences and favorites