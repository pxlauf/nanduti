# Ñanduti Transit App

A modern React Native/Expo mobile application for navigating public transit in Asunción, Paraguay. Built with Expo, React Native Maps, and Supabase.

## 🚀 Features

### Core Features
- **Interactive Map**: View all bus stops (~120 stops) across Asunción
- **Real-time Location**: Blue dot shows your current location
- **Route Planning**: Find direct and transfer routes between any two stops
- **Step-by-step Instructions**: Clear Spanish instructions for each journey
- **Walking Directions**: Calculate walking distance and time to stops
- **Transit Lines**: 15 bus lines with color-coded routes
- **Visual Routes**: See routes highlighted on the map
- **Smart Auto-fill**: Origin automatically filled with nearest stop

### User Experience
- **Loading States**: Clear indicators while data loads
- **Error Handling**: Graceful error messages for failed requests
- **Haptic Feedback**: Tactile feedback on button presses (iOS)
- **Smooth Animations**: Fluid transitions and interactions
- **Touch-Friendly**: All buttons meet 48x48dp touch target requirements
- **Error Boundaries**: Prevents app crashes from unexpected errors
- **Safe Area Support**: Proper spacing for notches and status bars

## 📱 Screenshots

### Home Screen
- Interactive map centered on user location
- Red markers showing all bus stops
- Transit route lines displayed as dashed gray lines
- "Planificar Ruta" (Plan Route) floating action button
- Stop details bottom sheet when tapping markers

### Route Planning
- Modal with origin/destination selection
- Origin auto-filled with nearest stop
- Search autocomplete for finding stops
- Route results showing direct and transfer options
- Duration, distance, and steps for each route

### Route Detail
- Map with highlighted route path
- Route summary (duration, distance, type)
- Step-by-step instructions in Spanish
- Walking, bus, and transfer indicators
- "Entendido" (Understood) button to return

## 🛠 Tech Stack

### Core
- **React Native 0.73.2** - Mobile framework
- **Expo 50.0.0** - Development platform and tooling
- **TypeScript 5.1.3** - Type safety (strict mode enabled)

### Navigation
- **React Navigation 6.1.9** - Screen navigation
- **Stack Navigator** - Hierarchical navigation

### Maps & Location
- **React Native Maps 1.10.0** - Interactive map display
- **Expo Location 16.1.0** - Device location services
- **Expo Haptics** - Tactile feedback support

### Backend
- **Supabase 2.38.5** - Database and API
- **PostgreSQL** - Transit data storage

### UI Components
- **React Native Gesture Handler 2.14.0** - Gesture handling
- **React Native Reanimated 3.6.0** - Smooth animations
- **React Native Safe Area Context 4.8.2** - Safe area handling
- **@gorhom/bottom-sheet 4.6.0** - Modal components

## 🚦 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Expo CLI (`npm install -g expo-cli`)
- Supabase account (free tier works)
- iOS Simulator (Mac) or Android Emulator/Device

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd nanduti
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your Supabase credentials:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

4. **Set up Supabase database**

Follow the [SEEDING.md](SEEDING.md) guide to:
- Create a new Supabase project
- Set up the database tables (stops, lines, routes, line_polylines)
- Run the seed script to populate with Asunción transit data

5. **Start the development server**
```bash
npm start
```

6. **Run on device/simulator**

- **iOS**: Press `i` in the terminal or use Expo Go app
- **Android**: Press `a` in the terminal or use Expo Go app
- **Web**: Press `w` in the terminal

## 📖 Documentation

- **[Quick Start Guide](QUICKSTART.md)** - Get up and running in 5 minutes
- **[Setup Guide](SETUP.md)** - Detailed step-by-step instructions
- **[Troubleshooting Guide](TROUBLESHOOTING.md)** - Common issues and solutions
- **[MVP Summary](MVP_SUMMARY.md)** - Implementation details
- **[Seeding Guide](SEEDING.md)** - Database setup and data population
- **[Project Structure](PROJECT_STRUCTURE.md)** - Code organization

## 🏗 Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── Map.tsx              # Interactive map component
│   ├── StopCard.tsx         # Bus stop card
│   ├── RouteCard.tsx        # Route result card
│   ├── BottomSheet.tsx      # Modal bottom sheet
│   ├── LoadingSpinner.tsx    # Loading indicator
│   └── ErrorBoundary.tsx    # Error boundary component
├── screens/        # Screen components
│   ├── HomeScreen.tsx        # Main map screen
│   └── RouteDetailScreen.tsx # Route details screen
├── services/       # API and external services
│   ├── supabase.ts          # Supabase client and queries
│   ├── location.ts          # Location services
│   └── routing.ts           # Route finding algorithm
├── hooks/          # Custom React hooks
│   ├── useLocation.ts       # Location tracking hook
│   └── useRoute.ts          # Route finding hook
├── types/          # TypeScript type definitions
│   └── index.ts             # All type definitions
├── utils/          # Utility functions
│   ├── constants.ts         # App constants (colors, defaults)
│   └── distance.ts          # Distance calculations
└── styles/         # Styling constants
```

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on web
npm run web

# Type checking
npm run type-check
```

### Type Checking

The project uses TypeScript in strict mode. Run type checking before committing:

```bash
npm run type-check
```

### Code Style

- Use TypeScript strict mode
- Follow existing code conventions
- Add proper null checks
- Use React.memo for performance optimization
- Remove console statements before committing

## 🗄 Database Schema

### Tables

- **stops**: Geographic locations of bus stops (~120 stops)
  - `id`: Primary key
  - `name`: Stop name
  - `latitude`, `longitude`: Coordinates
  - `neighborhood`: Neighborhood name

- **lines**: Transit line information (15 lines)
  - `id`: Primary key
  - `name`: Line name (e.g., "Línea 1")
  - `color`: Hex color code for display
  - `description`: Line description

- **routes**: Junction table linking lines to stops
  - `id`: Primary key
  - `line_id`: Foreign key to lines
  - `stop_id`: Foreign key to stops
  - `order`: Stop order in the route

- **line_polylines**: GeoJSON route geometries
  - `id`: Primary key
  - `line_id`: Foreign key to lines
  - `geojson`: LineString geometry

See [SEEDING.md](SEEDING.md) for database seeding instructions.

## 🚗 Route Finding Algorithm

The app finds routes using a multi-step approach:

1. **Direct Routes**: Find bus lines that serve both origin and destination stops
2. **Transfer Routes**: Find combinations of lines through intermediate stops
3. **Ranking**: Sort routes by total time and distance

### Route Calculations

- **Walking Speed**: 5 km/h
- **Bus Speed**: 20 km/h
- **Transfer Time**: 5 minutes (estimated)
- **Search Radius**: 500 meters for nearby stops

## 🐛 Troubleshooting

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for common issues and solutions:

- Map not showing stops
- Location permission not working
- Routes not found
- App crashes
- Connection errors

## 📝 Contributing

This is an MVP project. Future improvements could include:

- [ ] Real-time bus tracking
- [ ] Schedule information
- [ ] Fare calculator
- [ ] Favorites/saved routes
- [ ] Multiple language support
- [ ] Accessibility features
- [ ] User accounts
- [ ] Push notifications
- [ ] Dark mode

## 📄 License

MIT License - feel free to use this project for learning or your own transit apps!

## 🙏 Credits

Built for the Ñanduti public transit system in Asunción, Paraguay.

Special thanks to:
- Expo team for the amazing development platform
- Supabase for the easy-to-use backend
- React Native community for great libraries
