# Setup Guide

## Prerequisites

Before setting up the Nanduti app, ensure you have the following installed:

- Node.js (v16 or later)
- npm or yarn
- Expo CLI
- Android Studio (for Android development) or Xcode (for iOS development)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-repo/nanduti.git
cd nanduti
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Copy the `.env.example` file to `.env` and fill in the required values:

```bash
cp .env.example .env
```

Edit the `.env` file with your actual credentials:

```env
# Supabase configuration
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key

# Mapbox access token (optional for advanced routing)
MAPBOX_ACCESS_TOKEN=your-mapbox-token

# Development settings
DEBUG_MODE=true
```

### 4. Start the Development Server

```bash
npm start
# or
yarn start
```

This will start the Expo development server and open the Expo Dev Tools in your browser.

### 5. Run the App

#### Android

```bash
npm run android
# or
yarn android
```

#### iOS

```bash
npm run ios
# or
yarn ios
```

#### Web

```bash
npm run web
# or
yarn web
```

## Configuration

### Expo Configuration

The app is configured in `app.json` with the following settings:

- **Name**: nanduti
- **Version**: 0.1.0
- **Android Package**: com.nanduti.app
- **Plugins**: Location and Maps

### TypeScript Configuration

TypeScript is configured in `tsconfig.json` with:

- **Target**: ES2020
- **Strict Mode**: Enabled
- **Base URL**: ./src
- **Paths**: @/* for imports

### Babel Configuration

Babel is configured in `babel.config.js` with:

- **Preset**: babel-preset-expo
- **Plugins**: react-native-reanimated

## Development Tools

### Type Checking

```bash
npm run typecheck
```

### Linting

```bash
npm run lint
```

### Testing

```bash
npm test
```

## Troubleshooting

### Common Issues

#### 1. Missing Dependencies

If you get errors about missing dependencies, run:

```bash
npm install
# or
yarn install
```

#### 2. Expo CLI Issues

If you have issues with Expo CLI, try:

```bash
npm install -g expo-cli
# or
yarn global add expo-cli
```

#### 3. Android/iOS Build Issues

Ensure you have the proper development environment set up:

- **Android**: Android Studio with SDK and emulator
- **iOS**: Xcode with iOS simulator

#### 4. Environment Variables Not Loading

Make sure your `.env` file is in the root directory and has the correct format.

### Debugging

Use the following tools for debugging:

- **Expo Dev Tools**: Built-in debugging tools
- **React Native Debugger**: Standalone debugger
- **Flipper**: Mobile app debugging platform
- **Console Logs**: `console.log()` statements

## Deployment

### Build for Production

#### Android

```bash
expo build:android
```

#### iOS

```bash
expo build:ios
```

### Publish to Expo

```bash
expo publish
```

### Configuration for Production

Before deploying to production:

1. Update version in `app.json`
2. Set `DEBUG_MODE=false` in `.env`
3. Configure proper app icons and splash screen
4. Set up proper error tracking and analytics

## Updates

### Updating Dependencies

```bash
npm update
# or
yarn upgrade
```

### Updating Expo

```bash
npm install -g expo-cli
# or
yarn global upgrade expo-cli
```

## Support

For issues with setup or development, refer to:

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Supabase Documentation](https://supabase.com/docs)

## Next Steps

After setting up the app:

1. Connect to your Supabase backend
2. Test the app with real data
3. Customize the UI to match your brand
4. Add additional features as needed
5. Prepare for production deployment