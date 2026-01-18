# Ñanduti Transit App

A React Native/Expo mobile application for navigating public transit in Asunción, Paraguay. Built with Expo, React Native Maps, and Supabase.

## 🚀 Quick Start

Get the app running in 5 minutes with our [Quick Start Guide](QUICKSTART.md).

## 📱 MVP Features

The MVP includes all core features for transit navigation:

- ✅ Interactive map with user location (blue dot)
- ✅ All bus stops in Asunción (~120 stops)
- ✅ 15 transit lines with route colors
- ✅ Route planning with direct routes
- ✅ Route planning with transfer routes
- ✅ Step-by-step instructions in Spanish
- ✅ Walking distance calculations
- ✅ Loading and error states
- ✅ Full TypeScript support

## Tech Stack

### Core
- **React Native** - Mobile framework
- **Expo** - Development platform
- **TypeScript** - Type safety

### Navigation
- **React Navigation** - Screen navigation (Stack Navigator)

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

## Documentation

- **[Quick Start Guide](QUICKSTART.md)** - Get up and running in 5 minutes
- **[MVP Setup Guide](docs/MVP_SETUP.md)** - Detailed setup instructions
- **[Architecture](docs/ARCHITECTURE.md)** - System architecture overview
- **[Routing Logic](docs/ROUTING_LOGIC.md)** - Route finding algorithms
- **[Setup Guide](docs/SETUP.md)** - Development environment setup
- **[API Reference](docs/API.md)** - API documentation
- **[Database Schema](docs/SCHEMA.md)** - Database structure
- **[Seeding Guide](SEEDING.md)** - How to populate the database

## Installation

See [Quick Start Guide](QUICKSTART.md) for quick setup, or [MVP Setup Guide](docs/MVP_SETUP.md) for detailed instructions.

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Configure Supabase (see guides above)

# Start development server
npm start
```

## Database Setup

The transit data is stored in Supabase PostgreSQL database with the following tables:

- **stops** - Bus stop locations
- **lines** - Transit line information
- **routes** - Line-stop relationships
- **line_polylines** - Route geometries

See [SEEDING.md](SEEDING.md) for database seeding instructions.

## Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── Map.tsx
│   ├── SearchBar.tsx
│   ├── StopCard.tsx
│   ├── RouteCard.tsx
│   ├── BottomSheet.tsx
│   └── LoadingSpinner.tsx
├── screens/        # Screen components
│   ├── HomeScreen.tsx
│   └── RouteDetailScreen.tsx
├── services/       # API and external services
│   ├── supabase.ts
│   ├── location.ts
│   └── routing.ts
├── hooks/          # Custom React hooks
│   ├── useLocation.ts
│   └── useRoute.ts
├── types/          # TypeScript type definitions
│   └── index.ts
├── utils/          # Utility functions
│   ├── constants.ts
│   └── distance.ts
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

## How It Works

### User Flow

1. **App Launch**
   - App requests location permission
   - Shows map centered on user's location
   - Displays all bus stops as red markers
   - Shows transit route lines

2. **Plan Route**
   - User taps "Planificar Ruta" button
   - Modal opens with origin pre-filled (nearest stop)
   - User searches for destination stop
   - App finds available routes (direct + transfers)

3. **View Route**
   - User selects a route from the list
   - Route detail screen opens
   - Map highlights the selected route(s)
   - Step-by-step instructions in Spanish

4. **Navigate**
   - User follows instructions
   - Taps "Entendido" to go back

### Route Finding Algorithm

The app finds routes using these steps:

1. **Direct Routes**: Find bus lines that serve both origin and destination stops
2. **Transfer Routes**: Find combinations of lines through intermediate stops
3. **Ranking**: Sort routes by total time and distance

See [Routing Logic](docs/ROUTING_LOGIC.md) for detailed algorithm information.

## Database

### Tables

- **stops**: Geographic locations of bus stops
- **lines**: Transit line information (name, color, description)
- **routes**: Junction table linking lines to stops in order
- **line_polylines**: GeoJSON LineString geometries for map display

### Sample Data

- ~120 stops across Asunción neighborhoods
- 15 bus lines (Línea 1-15)
- Route definitions for each line
- GeoJSON polylines for visual route display

See [SEEDING.md](SEEDING.md) for seeding instructions.

## Screens

### Home Screen
- Interactive map with user location and stops
- "Planificar Ruta" FAB button
- Stop details bottom sheet
- Route planning modal
- Route results list

### Route Detail Screen
- Route map with highlighted path
- Route summary (duration, distance, type)
- Step-by-step instructions in Spanish
- Walking directions
- Bus line information
- Transfer point details (for transfer routes)
- "Entendido" button to go back

## Contributing

This is an MVP project. Future improvements could include:

- Real-time bus tracking
- Schedule information
- Fare calculator
- Favorites/saved routes
- Multiple language support
- Accessibility features
- User accounts

## License

MIT

## Credits

Built for the Ñanduti public transit system in Asunción, Paraguay.
