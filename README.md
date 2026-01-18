# Nanduti Transit App

A React Native/Expo mobile application for navigating public transit in Asunción, Paraguay. Built with Expo, React Native Maps, and Supabase.

## Tech Stack

### Core
- **React Native** - Mobile framework
- **Expo** - Development platform
- **TypeScript** - Type safety

### Navigation
- **React Navigation** - Screen navigation
- **Bottom Tabs** - Tab-based navigation

### Maps & Location
- **React Native Maps** - Map display
- **Expo Location** - Device location services

### Backend
- **Supabase** - Database and API
- **PostgreSQL** - Transit data storage

### UI Components
- **React Native Bottom Sheet** - Modal components
- **React Native Gesture Handler** - Gesture handling
- **React Native Reanimated** - Smooth animations

## Features

- [ ] Interactive map with transit routes
- [ ] Real-time location tracking
- [ ] Stop search and discovery
- [ ] Route planning between stops
- [ ] Transit line details and schedules
- [ ] Nearby stops finder

## Getting Started

See [SETUP.md](./SETUP.md) for installation and setup instructions.

## Documentation

- [Architecture](./docs/ARCHITECTURE.md) - System architecture overview
- [Routing Logic](./docs/ROUTING_LOGIC.md) - Route finding algorithms
- [Setup Guide](./docs/SETUP.md) - Detailed setup instructions
- [Deployment](./docs/DEPLOY.md) - Deployment guide
- [API Reference](./docs/API.md) - API documentation

## Database Setup

The transit data is stored in Supabase PostgreSQL database with the following tables:

- **stops** - Bus stop locations
- **lines** - Transit line information
- **routes** - Line-stop relationships
- **line_polylines** - Route geometries

See [SEEDING.md](./SEEDING.md) for database seeding instructions.

## Project Structure

```
src/
├── components/     # Reusable UI components
├── screens/        # Screen components
├── services/       # API and external services
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
├── hooks/          # Custom React hooks
└── styles/         # Styling constants
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Type checking
npm run type-check
```

## License

MIT
