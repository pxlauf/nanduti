# Ñanduti MVP - Quick Start Guide

Get the Ñanduti transit app running in 5 minutes!

## 1. Install Dependencies

```bash
npm install
```

## 2. Set Up Supabase

1. Go to https://supabase.com and create a free account
2. Create a new project (choose any region)
3. Go to Settings > API
4. Copy your Project URL and anon key

## 3. Configure Environment

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:

```
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-from-supabase-dashboard
```

## 4. Set Up Database

Option A: Quick Setup (Recommended for testing)

1. In Supabase, go to SQL Editor
2. Run the SQL commands from these files in order:
   - `seeds/00_drop_all.sql` (optional, to reset)
   - `seeds/schema.sql` (create tables)
   - `seeds/stops.sql` (add stops)
   - `seeds/lines.sql` (add bus lines)
   - `seeds/routes.sql` (add routes)
   - `seeds/polylines.sql` (add route geometries)

Option B: Manual Setup

1. Create tables manually using the schema in `docs/schema.sql`
2. Or use the detailed guide in `SEEDING.md`

## 5. Run the App

```bash
npm start
```

Then:
- Press `a` to run on Android
- Press `i` to run on iOS
- Or scan QR code with Expo Go app on your phone

## 6. Test the App

1. Allow location permissions when prompted
2. You should see a map with:
   - Your location (blue dot)
   - Bus stops (red markers)
   - Transit route lines (gray dashed lines)

3. Tap "Planificar Ruta" button
4. The app will auto-fill the nearest stop as origin
5. Search for a destination stop
6. Select a route from the results
7. View step-by-step instructions in Spanish

## Common Issues

**"Supabase credentials not found"**
- Make sure `.env` file exists in project root
- Restart the app after creating `.env`

**"No stops found on map"**
- Check that database tables are populated
- Verify Supabase URL and key are correct

**Location not showing**
- Grant location permissions to the app
- On Android: Settings > Apps > Nanduti > Permissions > Location
- On iOS: Settings > Nanduti > Location

## Need Help?

- Full setup guide: [docs/MVP_SETUP.md](docs/MVP_SETUP.md)
- Architecture details: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- API reference: [docs/API.md](docs/API.md)
- Database seeding: [SEEDING.md](SEEDING.md)

## What's Included

✅ Interactive map with user location
✅ All bus stops in Asunción (~120 stops)
✅ 15 transit lines with route colors
✅ Route planning with direct routes
✅ Route planning with transfer routes
✅ Step-by-step instructions in Spanish
✅ Walking distance calculations
✅ Loading and error states
✅ Full TypeScript support

## What's Next?

After the MVP, you can add:
- Real-time bus tracking
- Schedule information
- Fare calculator
- Favorites/saved routes
- Multiple language support
- Accessibility features
- User accounts and preferences

Happy coding! 🚌
