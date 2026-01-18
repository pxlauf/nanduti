# Ñanduti MVP - Setup Guide

This guide will help you set up and run the Ñanduti MVP app locally.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo Go app on your phone (for testing)
- Android Studio or Xcode (for building)
- Supabase account

## Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd nanduti
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```

4. **Configure Supabase**:
   - Create a new project at https://supabase.com
   - Go to Settings > API
   - Copy your project URL and anon key
   - Update `.env` file:
     ```
     SUPABASE_URL=https://your-project.supabase.co
     SUPABASE_ANON_KEY=your-anon-key-here
     ```

5. **Set up the database**:
   - Run the SQL script from `seeds/schema.sql` in your Supabase SQL editor
   - Run the seed data from `seeds/stops.sql`, `seeds/lines.sql`, etc.
   - Or use the `SEEDING.md` guide for detailed instructions

## Running the App

### Development Mode

1. **Start the development server**:
   ```bash
   npm start
   ```

2. **Choose your platform**:
   - Press `a` for Android
   - Press `i` for iOS
   - Press `w` for web
   - Scan the QR code with Expo Go app on your phone

### Android

1. Make sure you have an Android device or emulator running
2. Run:
   ```bash
   npm run android
   ```

### iOS

1. Make sure you have an iOS simulator running or a physical device connected
2. Run:
   ```bash
   npm run ios
   ```

## App Features

The MVP includes:

1. **Interactive Map**
   - Shows all bus stops in Asunción
   - Displays user location (blue dot)
   - Shows transit route lines
   - Tap on stops to see details

2. **Route Planning**
   - Tap "Planificar Ruta" button
   - Select origin (auto-filled with nearby stop)
   - Search and select destination
   - View available routes (direct and transfer)
   - See route details with step-by-step instructions

3. **Route Details**
   - Map highlighting the selected route
   - Step-by-step instructions in Spanish
   - Walking distances and bus information
   - Transfer points for transfer routes
   - "Entendido" button to go back

## Project Structure

```
nanduti/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Map.tsx
│   │   ├── SearchBar.tsx
│   │   ├── StopCard.tsx
│   │   ├── RouteCard.tsx
│   │   ├── BottomSheet.tsx
│   │   └── LoadingSpinner.tsx
│   ├── screens/         # Screen components
│   │   ├── HomeScreen.tsx
│   │   └── RouteDetailScreen.tsx
│   ├── services/       # API and external services
│   │   ├── supabase.ts
│   │   ├── location.ts
│   │   └── routing.ts
│   ├── hooks/           # Custom React hooks
│   │   ├── useLocation.ts
│   │   └── useRoute.ts
│   ├── types/           # TypeScript type definitions
│   │   └── index.ts
│   └── utils/           # Utility functions
│       ├── constants.ts
│       └── distance.ts
├── App.tsx             # Root component with navigation
├── package.json         # Dependencies and scripts
├── app.json           # Expo configuration
├── tsconfig.json      # TypeScript configuration
└── babel.config.js    # Babel configuration
```

## Troubleshooting

### Supabase Connection Issues

If you see "Supabase credentials not found" warning:
- Make sure `.env` file exists in the project root
- Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY` are set correctly
- Restart the development server after changing environment variables

### Location Permission Issues

If location doesn't work:
- Make sure you've granted location permissions to the app
- On Android: Settings > Apps > Nanduti > Permissions > Location
- On iOS: Settings > Nanduti > Location

### Map Display Issues

If the map doesn't load:
- Check your internet connection
- Verify Google Maps API key is configured (if using custom styles)
- Try running on a physical device instead of emulator

### Type Errors

If you see TypeScript errors:
- Run `npm run type-check` to see all errors
- Make sure all dependencies are installed correctly
- Try deleting `node_modules` and running `npm install` again

## Building for Production

### Android APK

```bash
# Build development build
eas build --platform android --profile development

# Or build production APK
eas build --platform android
```

### iOS IPA

```bash
# Build development build
eas build --platform ios --profile development

# Or build production IPA
eas build --platform ios
```

Note: You'll need to set up EAS Build first. See the [Expo documentation](https://docs.expo.dev/build/introduction/).

## Database Seeding

For detailed information on setting up the database with transit data, see [SEEDING.md](../SEEDING.md).

The database includes:
- ~120 bus stops in Asunción
- 15 transit lines (Línea 1-15)
- Route definitions linking lines to stops
- GeoJSON polylines for drawing routes on maps

## Next Steps

After the MVP is running, you can:
- Add real-time bus tracking
- Implement favorites/saved routes
- Add schedule information
- Include fare calculations
- Support multiple languages
- Add accessibility features

## Support

For issues or questions:
- Check the main [README.md](../README.md)
- Review the [ARCHITECTURE.md](ARCHITECTURE.md) for technical details
- See [API.md](API.md) for Supabase API documentation
