# Setup Guide

This guide will help you set up the Nanduti Transit App development environment.

## Prerequisites

### Required Software

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)
- **Expo CLI** (installed via npm)
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)

### Optional but Recommended

- **VS Code** with React Native and TypeScript extensions
- **Expo Go** app on your phone (from App Store or Play Store)
- **Android Emulator** or **iOS Simulator**

## Environment Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd nanduti
```

### 2. Install Dependencies

```bash
npm install
```

This installs all required packages including:
- React Native and Expo
- Navigation libraries
- Maps and location services
- Supabase client
- UI components

### 3. Environment Variables

Copy the example environment file and add your credentials:

```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
MAPBOX_ACCESS_TOKEN=optional-mapbox-token
```

#### Getting Supabase Credentials

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project or select an existing one
3. Go to Settings → API
4. Copy the Project URL and anon public key
5. Paste them into your `.env` file

#### Setting Up the Database

Follow the database seeding instructions in [SEEDING.md](../SEEDING.md):

```bash
# Create tables and seed data
psql -h db.project-ref.supabase.co -U postgres -d postgres < seeds/00_drop_all.sql
psql -h db.project-ref.supabase.co -U postgres -d postgres < seeds/stops.sql
psql -h db.project-ref.supabase.co -U postgres -d postgres < seeds/lines.sql
psql -h db.project-ref.supabase.co -U postgres -d postgres < seeds/routes.sql
psql -h db.project-ref.supabase.co -U postgres -d postgres < seeds/polylines.sql
```

## Running the App

### Option 1: Expo Go (Easiest)

1. Start the development server:
   ```bash
   npm start
   ```

2. Download **Expo Go** on your phone:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

3. Scan the QR code displayed in your terminal
4. The app will open in Expo Go

### Option 2: Android Emulator

1. Start the development server:
   ```bash
   npm start
   ```

2. Press `a` in the terminal to run on Android
3. The app will launch in your emulator

**Note:** Make sure you have an Android emulator running first:
```bash
# List available emulators
emulator -list-avds

# Start an emulator
emulator -avd <emulator-name>
```

### Option 3: iOS Simulator (macOS only)

1. Start the development server:
   ```bash
   npm start
   ```

2. Press `i` in the terminal to run on iOS
3. The app will launch in the iOS Simulator

## Development Workflow

### Type Checking

Run TypeScript type checker:

```bash
npm run type-check
```

### Debugging

The app supports React Native debugging:

1. Shake your device or press `Ctrl+M` in the emulator
2. Select "Debug"
3. Opens Chrome DevTools for debugging

### Hot Reloading

The app supports hot reloading - changes to your code will be reflected immediately without restarting the app.

### Clearing Cache

If you encounter issues:

```bash
# Clear Expo cache
npx expo start --clear

# Clear node modules (last resort)
rm -rf node_modules
npm install
```

## Platform-Specific Setup

### Android Setup

1. Install Android Studio
2. Install Android SDK (API level 33 or higher)
3. Set up an Android Virtual Device (AVD)
4. Accept Android SDK licenses:
   ```bash
   $ANDROID_HOME/tools/bin/sdkmanager --licenses
   ```

**Required Android Permissions:**
- `ACCESS_FINE_LOCATION` - For user location
- `ACCESS_COARSE_LOCATION` - For approximate location
- `INTERNET` - For network requests

### iOS Setup (macOS only)

1. Install Xcode from the App Store
2. Install Xcode Command Line Tools:
   ```bash
   xcode-select --install
   ```

3. Install CocoaPods:
   ```bash
   sudo gem install cocoapods
   ```

4. Install iOS pods:
   ```bash
   cd ios
   pod install
   cd ..
   ```

**Required iOS Permissions:**
- Location When In Use Usage Description - Already configured in app.json

## Troubleshooting

### Common Issues

**Issue:** Metro bundler won't start
```bash
# Clear cache and restart
npx expo start -c
```

**Issue:** Dependencies not installing
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Issue:** Location permission errors
- Make sure you've added the location plugin in app.json
- Check that permissions are declared in app.json
- Rebuild the app after configuration changes

**Issue:** Map not rendering
- Ensure Google Maps API key is configured (for Android)
- Check that react-native-maps is properly linked
- Verify the app has location permissions

**Issue:** Supabase connection errors
- Verify your .env file has correct credentials
- Check that your Supabase project is active
- Ensure RLS policies allow public SELECT access

### Getting Help

- Check [Expo Documentation](https://docs.expo.io/)
- Review [React Native Docs](https://reactnative.dev/)
- Check Supabase [JavaScript Client Docs](https://supabase.com/docs/reference/javascript)
- Open an issue in the repository

## Next Steps

After setup is complete:

1. Review [ARCHITECTURE.md](./ARCHITECTURE.md) to understand the codebase
2. Read [ROUTING_LOGIC.md](./ROUTING_LOGIC.md) for routing algorithms
3. Check [API.md](./API.md) for available services
4. Start building features!

## Production Build

When ready to deploy:

1. Build for Android:
   ```bash
   eas build --platform android
   ```

2. Build for iOS:
   ```bash
   eas build --platform ios
   ```

See [DEPLOY.md](./DEPLOY.md) for detailed deployment instructions.
