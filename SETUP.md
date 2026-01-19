# Setup Guide - Ñanduti Transit App

Complete step-by-step guide to set up and run the Ñanduti Transit App on your local machine.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Supabase Setup](#supabase-setup)
4. [Database Seeding](#database-seeding)
5. [Environment Configuration](#environment-configuration)
6. [Running the App](#running-the-app)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

1. **Node.js** (version 18 or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version`

2. **npm** (comes with Node.js)
   - Verify installation: `npm --version`

3. **Git**
   - Download from [git-scm.com](https://git-scm.com/)
   - Verify installation: `git --version`

4. **Expo CLI**
   ```bash
   npm install -g expo-cli
   ```
   - Verify installation: `expo --version`

### Platform-Specific Requirements

#### iOS Development (Mac only)
- **Xcode** (latest version) from App Store
- **CocoaPods**:
  ```bash
  sudo gem install cocoapods
  ```
- **iOS Simulator** (included with Xcode)

#### Android Development
- **Android Studio** with Android SDK
- Set up Android Virtual Device (AVD) or connect physical device
- Enable USB debugging on physical device

#### Web Development
- Modern web browser (Chrome, Firefox, Safari, Edge)

## Installation

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone <repository-url>
cd nanduti
```

### Step 2: Install Dependencies

```bash
# Install all npm packages
npm install

# This may take several minutes on first run
```

**What gets installed:**
- React Native and Expo
- React Navigation
- Supabase client
- Map and location libraries
- UI components and utilities
- Development tools

### Step 3: Verify Installation

```bash
# Check if Expo CLI works
expo --version

# Run type checking (should pass without errors)
npm run type-check
```

## Supabase Setup

### Step 1: Create a Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up (GitHub or email)
4. Verify your email if required

### Step 2: Create a New Project

1. Click "New Project"
2. Fill in project details:
   - **Name**: `nanduti` (or your preferred name)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest region to your users
3. Click "Create new project"
4. Wait for project to be provisioned (2-3 minutes)

### Step 3: Get Your Credentials

1. In your Supabase project dashboard
2. Go to **Settings** → **API**
3. Copy these values:
   - **Project URL**: `https://xxxxxxxx.supabase.co`
   - **anon public key**: Long alphanumeric string

### Step 4: Create Database Tables

Option A: Use the SQL Editor (Manual)

1. Go to **SQL Editor** in Supabase dashboard
2. Click "New query"
3. Run each of these SQL commands:

```sql
-- Create stops table
CREATE TABLE stops (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  latitude NUMERIC NOT NULL,
  longitude NUMERIC NOT NULL,
  neighborhood TEXT
);

-- Create lines table
CREATE TABLE lines (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  color TEXT NOT NULL,
  description TEXT
);

-- Create routes junction table
CREATE TABLE routes (
  id SERIAL PRIMARY KEY,
  line_id INTEGER REFERENCES lines(id),
  stop_id INTEGER REFERENCES stops(id),
  "order" INTEGER NOT NULL
);

-- Create line_polylines table
CREATE TABLE line_polylines (
  id SERIAL PRIMARY KEY,
  line_id INTEGER REFERENCES lines(id),
  geojson JSONB NOT NULL
);

-- Create indexes for better performance
CREATE INDEX idx_routes_line ON routes(line_id);
CREATE INDEX idx_routes_stop ON routes(stop_id);
CREATE INDEX idx_stops_coords ON stops(latitude, longitude);
```

Option B: Use the seeding script (Automated)

See [SEEDING.md](SEEDING.md) for automated seeding with sample data.

### Step 5: Enable Row Level Security (RLS) - Optional

For production, enable RLS to secure your database:

```sql
-- Enable RLS
ALTER TABLE stops ENABLE ROW LEVEL SECURITY;
ALTER TABLE lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE line_polylines ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public read access for stops" ON stops
  FOR SELECT USING (true);

CREATE POLICY "Public read access for lines" ON lines
  FOR SELECT USING (true);

CREATE POLICY "Public read access for routes" ON routes
  FOR SELECT USING (true);

CREATE POLICY "Public read access for polylines" ON line_polylines
  FOR SELECT USING (true);
```

## Database Seeding

### Option A: Use Provided Seed Data

The project includes sample data for Asunción, Paraguay:

1. Navigate to the project directory
2. Follow the instructions in [SEEDING.md](SEEDING.md)
3. Run the seed script:
   ```bash
   npm run seed
   ```

### Option B: Manual Data Entry

If you want to add your own transit data:

1. **Add Stops**:
   ```sql
   INSERT INTO stops (name, latitude, longitude, neighborhood) VALUES
   ('Central', -25.268, -57.565, 'Centro'),
   ('Shopping del Sol', -25.330, -57.575, 'Villa Morra');
   ```

2. **Add Lines**:
   ```sql
   INSERT INTO lines (name, color, description) VALUES
   ('Línea 1', '#FF0000', 'Ruta 1 - Centro a Lambaré'),
   ('Línea 2', '#00FF00', 'Ruta 2 - Centro a San Lorenzo');
   ```

3. **Add Routes** (stop order in the line):
   ```sql
   INSERT INTO routes (line_id, stop_id, "order") VALUES
   (1, 1, 0),  -- Line 1: Stop 1 (first)
   (1, 2, 1);  -- Line 1: Stop 2 (second)
   ```

4. **Add Polylines** (route geometry):
   ```sql
   INSERT INTO line_polylines (line_id, geojson) VALUES
   (1, '{"type":"LineString","coordinates":[[-57.565,-25.268],[-57.575,-25.330]]}');
   ```

## Environment Configuration

### Step 1: Create .env File

```bash
# Copy the example file
cp .env.example .env
```

### Step 2: Edit .env File

Open `.env` in your text editor and add your credentials:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here

# Mapbox Access Token (optional, for custom map styles)
MAPBOX_ACCESS_TOKEN=your-mapbox-token-here
```

**Important:**
- Replace `your-project-id` with your actual Supabase project ID
- Replace `your-anon-key-here` with your actual anon key
- Keep the .env file private (don't commit to Git)
- The .gitignore file already excludes .env

### Step 3: Verify Environment Variables

The app will fail silently if credentials are incorrect. Make sure:
- No extra spaces or quotes around values
- No missing characters or typos
- Both URL and key are present

## Running the App

### Step 1: Start the Development Server

```bash
npm start
```

This will:
- Start the Expo development server
- Show a QR code in your terminal
- Open a browser at `http://localhost:19002`

### Step 2: Choose Your Platform

#### Option A: iOS Simulator (Mac only)

1. Ensure Xcode is installed
2. In the Expo CLI, press `i`
3. Wait for the iOS Simulator to launch
4. The app should load automatically

#### Option B: Android Emulator

1. Ensure Android Studio and AVD are set up
2. Start your Android Emulator
3. In the Expo CLI, press `a`
4. The app should load automatically

#### Option C: Physical Device

1. Install **Expo Go** app on your device:
   - iOS: App Store
   - Android: Google Play Store

2. Connect device to your computer via USB

3. For Android:
   - Enable USB debugging in Developer Options
   - In Expo CLI, press `a`
   - App should launch automatically

4. For iOS:
   - Open Expo Go app
   - Scan the QR code from Expo CLI
   - Or enter the URL manually

#### Option D: Web Browser

1. In the Expo CLI, press `w`
2. The app will open in your default browser
3. Note: Some features (location) may be limited on web

### Step 3: Test the App

Once the app is running:

1. **Grant Location Permission**
   - The app will request location permission
   - Allow it to see your position on the map

2. **Verify Map Display**
   - You should see a map centered on Asunción
   - Red markers should appear for bus stops
   - Your location should appear as a blue dot

3. **Test Route Planning**
   - Tap "Planificar Ruta" button
   - Search for a destination stop
   - Select a route from the results
   - View route details and steps

## Known Warnings

### VS Code Schema Store Warning

**Warning**: VS Code may show a notification about "Downloading schemas from the internet". This is a normal feature of VS Code that helps with IntelliSense and autocompletion for configuration files.

**Why it happens**: VS Code downloads JSON schemas for various configuration files (including `tsconfig.json`, `package.json`, etc.) from the internet to provide better IntelliSense.

**Is it safe?**: Yes, these come from official schema repositories (SchemaStore.org) and are used by most developers globally.

**Can I turn it off?**: If you prefer not to download schemas:
1. Open VS Code Settings
2. Search for "json schema"
3. Disable or configure under `JSON > Schemas: Download` settings

**Recommendation**: Leave it enabled for better development experience with autocompletion and error detection in configuration files.

## Troubleshooting

### Common Issues

#### "Map not showing stops"

**Symptoms**: Map loads but no red markers appear

**Solutions**:
1. Check Supabase connection:
   ```bash
   # Check if .env file exists and is correct
   cat .env
   ```
2. Verify database has data:
   - Go to Supabase dashboard → Table Editor
   - Check if `stops` table has rows
3. Check console for errors:
   - In Expo CLI, look for API errors
   - Ensure Supabase URL and key are correct

#### "Location not working"

**Symptoms**: Blue dot doesn't appear, error message shown

**Solutions**:
1. Grant permission:
   - Go to device settings
   - Find the app
   - Enable location permission
2. Check location services:
   - Ensure device location is enabled
   - Try opening Google Maps first
3. Restart the app:
   - Close the app completely
   - Re-open it

#### "Routes not found"

**Symptoms**: No routes appear for a destination

**Solutions**:
1. This is expected for some stop pairs
   - Not all stops have direct or transfer connections
2. Try different stops:
   - Use stops in the same general area
   - Try major stops first
3. Check database:
   - Verify `routes` table has data
   - Ensure line-stop relationships exist

#### "App crashing"

**Symptoms**: App closes unexpectedly or shows error screen

**Solutions**:
1. Check environment variables:
   - Verify .env file exists
   - Check for typos in credentials
2. Clear Expo cache:
   ```bash
   npx expo start -c
   ```
3. Reinstall dependencies:
   ```bash
   rm -rf node_modules
   npm install
   ```
4. Check error boundary:
   - The app has an error boundary
   - Look at the error message displayed
   - Check console logs

#### "Connection errors"

**Symptoms**: Network errors, unable to fetch data

**Solutions**:
1. Check internet connection
2. Verify Supabase project is active
3. Check Supabase status page: [status.supabase.com](https://status.supabase.com)
4. Ensure firewall is not blocking connections

#### "File 'expo/tsconfig.base' not found"

**Symptoms**: TypeScript error about missing expo/tsconfig.base

**Cause**: The tsconfig.json file references a base configuration that may not be available in all Expo/TypeScript setups.

**Solution**:
- The issue has been resolved by using a standalone TypeScript configuration without extending from expo/tsconfig.base.
- The current tsconfig.json includes proper TypeScript settings for React Native/Expo development:
  - ES2020 target, ESNext modules
  - React Native JSX
  - Strict mode enabled
  - Path aliases configured (@/* → src/*)
- Run `npm run type-check` to verify the configuration works correctly.

### Getting Help

If you're still having issues:

1. Check the [Troubleshooting Guide](TROUBLESHOOTING.md)
2. Review [SEEDING.md](SEEDING.md) for database issues
3. Check Expo documentation: [docs.expo.dev](https://docs.expo.dev)
4. Check Supabase documentation: [supabase.com/docs](https://supabase.com/docs)

## Next Steps

Once the app is running successfully:

1. **Explore the features**
   - Try different route combinations
   - Test search functionality
   - Navigate between screens

2. **Customize the app**
   - Change colors in `src/utils/constants.ts`
   - Modify map styling in `src/components/Map.tsx`
   - Add new features or screens

3. **Prepare for deployment**
   - Update app.json with your app details
   - Test on physical devices
   - Check all permissions and configurations

4. **Read more documentation**
   - [MVP Summary](MVP_SUMMARY.md) for implementation details
   - [Project Structure](PROJECT_STRUCTURE.md) for code organization
   - [Quick Start](QUICKSTART.md) for faster setup

## Summary

You've successfully set up the Ñanduti Transit App! Here's what you did:

✅ Installed all dependencies
✅ Created and configured Supabase project
✅ Set up database tables
✅ Seeded sample data (optional)
✅ Configured environment variables
✅ Started the development server
✅ Tested the app on your platform

The app is now ready for development and testing!

## Support

For issues, questions, or contributions:
- Check the [Troubleshooting Guide](TROUBLESHOOTING.md)
- Review other documentation in the `/docs` folder
- Open an issue on the project repository
