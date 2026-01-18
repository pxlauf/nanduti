# Troubleshooting Guide - Ñanduti Transit App

Common issues and solutions for the Ñanduti Transit App.

## Table of Contents

1. [Map Issues](#map-issues)
2. [Location Issues](#location-issues)
3. [Route Finding Issues](#route-finding-issues)
4. [App Crashes](#app-crashes)
5. [Network & Connection Issues](#network--connection-issues)
6. [Supabase Issues](#supabase-issues)
7. [Build & Runtime Issues](#build--runtime-issues)
8. [Performance Issues](#performance-issues)

---

## Map Issues

### Map not showing stops

**Symptoms:**
- Map loads but no red markers appear
- Only gray map background visible
- Markers appear intermittently

**Possible Causes:**
1. Supabase connection issue
2. No data in database
3. Network connectivity problem
4. Environment variables misconfigured

**Solutions:**

#### 1. Check Supabase Connection

```bash
# Verify .env file exists and has correct values
cat .env

# Expected output:
# SUPABASE_URL=https://your-project-id.supabase.co
# SUPABASE_ANON_KEY=your-anon-key-here
```

If file doesn't exist or values are missing:
```bash
# Copy example file
cp .env.example .env

# Edit with your credentials
nano .env  # or your preferred editor
```

#### 2. Verify Database Has Data

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Table Editor** → **stops**
4. Verify table has rows (should have ~120 stops)
5. Check other tables: **lines**, **routes**, **line_polylines**

**If tables are empty:**
- Follow [SEEDING.md](SEEDING.md) to populate database
- Or manually add sample data

#### 3. Check Console for Errors

In Expo CLI terminal, look for:
- "Error fetching stops"
- "Supabase credentials not found"
- Network-related errors

**Error: "Supabase credentials not found"**
→ Solution: Check .env file exists and has correct values

**Error: "Failed to fetch" or network errors**
→ Solution: Check internet connection and Supabase status

#### 4. Test Supabase Connection Manually

```javascript
// Test in browser console or create test file
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

supabase
  .from('stops')
  .select('*')
  .limit(1)
  .then(console.log)
  .catch(console.error);
```

#### 5. Check Network Connectivity

- Ensure you're connected to the internet
- Try opening [supabase.com](https://supabase.com) in browser
- Check if Supabase is operational: [status.supabase.com](https://status.supabase.com)

---

### Map appears blank/black

**Symptoms:**
- Map area is completely black or gray
- No map tiles load

**Solutions:**

#### 1. Check Map Provider

React Native Maps uses Google Maps by default on Android and Apple Maps on iOS.

**Android:**
- Ensure Google Play Services is installed
- Check if other map apps work on device

**iOS:**
- Maps should work out of the box
- Try opening Apple Maps app

#### 2. Check API Keys (if using custom provider)

If you've configured a custom map provider:

```env
# .env
MAPBOX_ACCESS_TOKEN=your-token-here
```

Verify the token is valid and active.

#### 3. Restart Expo

```bash
# Clear cache and restart
npx expo start -c
```

---

## Location Issues

### Location permission not working

**Symptoms:**
- Blue dot doesn't appear on map
- Error message: "Error al obtener ubicación"
- App asks for permission repeatedly

**Solutions:**

#### 1. Grant Permission in Device Settings

**Android:**
1. Go to Settings → Apps → Ñanduti
2. Tap "Permissions"
3. Tap "Location"
4. Select "Allow all the time" or "Allow only while using app"

**iOS:**
1. Go to Settings → Ñanduti
2. Tap "Location"
3. Select "While Using the App"

#### 2. Enable Location Services

**Android:**
- Settings → Location → Toggle ON

**iOS:**
- Settings → Privacy → Location Services → Toggle ON

#### 3. Test Location with Other Apps

- Open Google Maps or Apple Maps
- Verify your location appears
- If other apps don't show location, it's a device issue

#### 4. Check App Permissions in Code

Verify permissions are configured in `app.json`:

```json
{
  "android": {
    "permissions": [
      "ACCESS_FINE_LOCATION",
      "ACCESS_COARSE_LOCATION"
    ]
  },
  "plugins": [
    [
      "expo-location",
      {
        "locationWhenInUsePermission": "Allow Nanduti to access your location..."
      }
    ]
  ]
}
```

#### 5. Reinstall App

Sometimes permission state gets corrupted:

```bash
# Uninstall app from device
# Then run again
npm start
# Reinstall via Expo Go or rebuild
```

### Location inaccurate or lagging

**Symptoms:**
- Blue dot is far from actual location
- Location updates slowly

**Solutions:**

#### 1. Improve GPS Signal

- Move to an area with better GPS reception
- Go outside (buildings can block GPS)
- Wait a few seconds for GPS to lock

#### 2. Check Location Accuracy

App uses `Location.Accuracy.High` for precise location. If issues persist:

The app may need time to acquire accurate location, especially indoors.

---

## Route Finding Issues

### No routes found for a destination

**Symptoms:**
- "No se encontraron rutas disponibles" message
- Empty results list after searching

**Possible Causes:**
1. No direct or transfer connections between stops
2. Database missing route information
3. Stop not served by any line

**Solutions:**

#### 1. This May Be Expected

Not all stop pairs have routes! The app only finds:
- **Direct routes**: Lines serving both origin and destination
- **Transfer routes**: Lines connected through an intermediate stop

**Try:**
- Selecting stops in the same general area
- Using major/busy stops
- Testing with known connected stops

#### 2. Verify Route Data

1. Go to Supabase Dashboard → Table Editor → **routes**
2. Verify table has rows
3. Check that lines have multiple stops

**Test with this query in Supabase SQL Editor:**

```sql
-- Check how many stops each line serves
SELECT l.name, COUNT(*) as stop_count
FROM lines l
JOIN routes r ON l.id = r.line_id
GROUP BY l.id, l.name
ORDER BY stop_count DESC;
```

#### 3. Check Stop-Line Relationships

```sql
-- Find lines serving a specific stop
SELECT l.name, l.color
FROM lines l
JOIN routes r ON l.id = r.line_id
WHERE r.stop_id = 1;  -- Replace with stop ID
```

If a stop has no lines, it can't be part of any route.

#### 4. Test with Known Working Stops

Try these common scenarios:
- Both stops in same neighborhood
- Stops on major routes (e.g., downtown)
- Stops that you know are connected

### Routes take too long to calculate

**Symptoms:**
- Loading spinner shows for more than 10 seconds
- App seems frozen

**Solutions:**

#### 1. Database Performance

Check if database indexes are created:

```sql
-- Verify indexes exist
SELECT indexname, tablename
FROM pg_indexes
WHERE tablename IN ('stops', 'lines', 'routes', 'line_polylines');
```

If missing, create them:

```sql
CREATE INDEX IF NOT EXISTS idx_routes_line ON routes(line_id);
CREATE INDEX IF NOT EXISTS idx_routes_stop ON routes(stop_id);
CREATE INDEX IF NOT EXISTS idx_stops_coords ON stops(latitude, longitude);
```

#### 2. Too Many Stops Being Queried

The app queries all stops for transfers. If you have 1000+ stops, consider:
- Adding caching
- Limiting search radius
- Pre-calculating common routes

---

## App Crashes

### App crashes on launch

**Symptoms:**
- App closes immediately after opening
- White screen then crash
- Error boundary appears

**Solutions:**

#### 1. Check Environment Variables

```bash
# Verify .env file
cat .env

# Ensure both URL and key are present
# No extra spaces or quotes
```

#### 2. Check Supabase Connection

If credentials are wrong, app may crash on first API call.

Test connection:
- Open Supabase Dashboard
- Try running a query in SQL Editor
- Verify project is active

#### 3. Review Console Logs

In Expo CLI, look for:
- TypeError messages
- "Cannot read property of undefined"
- React errors

#### 4. Clear Cache and Rebuild

```bash
# Clear Expo cache
npx expo start -c

# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

#### 5. Check Error Boundary

The app has an error boundary that catches crashes:

If you see "Oops! Something went wrong":
- Note the error message if shown
- Check console logs
- Try the "Reintentar" button

### App crashes during navigation

**Symptoms:**
- Crash when tapping "Planificar Ruta"
- Crash when selecting a route
- Crash when going back

**Solutions:**

#### 1. Check Navigation Params

Verify all navigation calls have required params:

```typescript
// Correct
navigation.navigate('RouteDetail', { route: travelRoute });

// Incorrect - missing param
navigation.navigate('RouteDetail');
```

#### 2. Check Data Availability

Ensure data exists before navigating:

```typescript
// Check if route exists before navigating
if (travelRoute) {
  navigation.navigate('RouteDetail', { route: travelRoute });
}
```

#### 3. Review Screen Components

Check for:
- Null/undefined access in render
- Missing error handling
- Unhandled promises

---

## Network & Connection Issues

### Failed to fetch data

**Symptoms:**
- "Error al buscar rutas" message
- Network errors in console
- Stays stuck on loading

**Solutions:**

#### 1. Check Internet Connection

- Test with other apps (browser, other apps)
- Try switching between WiFi and mobile data
- Check if you can reach Supabase

#### 2. Check Supabase Status

Visit [status.supabase.com](https://status.supabase.com)
- Check for outages
- Verify system is operational

#### 3. Verify Supabase URL

```bash
# Should be exactly like this:
SUPABASE_URL=https://your-project-id.supabase.co

# NOT:
# SUPABASE_URL=https://your-project-id.supabase.co/
# SUPABASE_URL=your-project-id.supabase.co
```

#### 4. Test API Directly

```bash
# Test Supabase API with curl
curl -X POST \
  'https://your-project-id.supabase.co/rest/v1/stops?select=*&limit=1' \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

If this fails, issue is with Supabase connection.

### Slow data loading

**Symptoms:**
- Loading spinner shows for more than 5 seconds
- Map takes long to populate

**Solutions:**

#### 1. Check Network Speed

- Test internet speed
- Try different network (WiFi vs mobile data)
- Check if other apps are slow

#### 2. Optimize Database Queries

Add indexes to frequently queried columns:

```sql
CREATE INDEX IF NOT EXISTS idx_stops_name ON stops(name);
CREATE INDEX IF NOT EXISTS idx_lines_name ON lines(name);
```

#### 3. Reduce Data Fetch Size

If fetching too much data, consider:
- Pagination for stops
- Lazy loading polylines
- Caching frequently accessed data

---

## Supabase Issues

### Cannot connect to Supabase

**Symptoms:**
- Connection refused errors
- 502/503 errors
- "Failed to fetch"

**Solutions:**

#### 1. Verify Project is Active

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Check if project is "Active"
3. If "Paused", resume the project

#### 2. Check Supabase Quotas

Free tier has limits:
- 500MB database size
- 2GB file storage
- 1GB bandwidth/month

Check usage:
- Dashboard → Settings → Billing

#### 3. Verify API Keys

1. Go to Dashboard → Settings → API
2. Copy URL and anon key
3. Update .env file
4. Restart app

### Supabase queries failing

**Symptoms:**
- Specific queries return errors
- Some data loads, some doesn't

**Solutions:**

#### 1. Test Query in Supabase Dashboard

Go to SQL Editor and run the query manually:

```sql
SELECT * FROM stops LIMIT 10;
SELECT * FROM routes WHERE line_id = 1;
```

If queries fail here, issue is with database.

#### 2. Check Table Permissions

Ensure tables have correct permissions:

```sql
-- Check table policies
SELECT * FROM pg_policies WHERE tablename = 'stops';
```

For public read access (development):

```sql
-- Drop all policies (allow all reads)
DROP POLICY IF EXISTS ON stops;
DROP POLICY IF EXISTS ON lines;
DROP POLICY IF EXISTS ON routes;
DROP POLICY IF EXISTS ON line_polylines;
```

#### 3. Check Column Names

Verify column names match TypeScript types:

```sql
-- Check stops columns
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'stops';
```

---

## Build & Runtime Issues

### TypeScript errors

**Symptoms:**
- npm run type-check fails
- Red squiggly lines in IDE
- Cannot build

**Solutions:**

#### 1. Run Type Check

```bash
npm run type-check
```

Review the errors and fix them one by one.

#### 2. Common TypeScript Issues

**Error: Property 'x' does not exist on type 'y'**

→ Solution: Check if property is optional or if type is correct

**Error: Cannot invoke an object whose type lacks a call signature**

→ Solution: Check if you're trying to call something that's not a function

**Error: Type 'undefined' is not assignable to type 'T'**

→ Solution: Add null check or proper typing

#### 3. Install Missing Type Definitions

```bash
# If using libraries without types
npm install --save-dev @types/library-name
```

### Expo/React Native build errors

**Symptoms:**
- Build fails with cryptic errors
- Metro bundler errors
- Module not found errors

**Solutions:**

#### 1. Clear Metro Cache

```bash
npx expo start -c
```

#### 2. Reinstall Dependencies

```bash
rm -rf node_modules package-lock.json
npm install
```

#### 3. Check for Version Conflicts

Ensure all package versions are compatible:

```bash
npm ls
```

Look for:
- Multiple versions of the same package
- Version ranges that don't overlap

#### 4. Update Dependencies

```bash
npm update
```

Be careful with major version updates - they may break compatibility.

---

## Performance Issues

### App feels slow

**Symptoms:**
- Laggy animations
- Slow scroll performance
- UI freezes briefly

**Solutions:**

#### 1. Check React DevTools

Use React DevTools to identify:
- Unnecessary re-renders
- Heavy components
- Memory leaks

#### 2. Optimize Lists

The app uses `FlatList` for performance, but you can optimize further:

```typescript
<FlatList
  data={items}
  renderItem={renderItem}
  keyExtractor={(item) => item.id}
  // Add these for better performance
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  updateCellsBatchingPeriod={50}
  initialNumToRender={10}
  windowSize={10}
/>
```

#### 3. Use React.memo

Components are already memoized:
- `RouteCard`
- `StopCard`
- `Map`

If you create new components, wrap them in `React.memo`.

#### 4. Avoid Heavy Calculations in Render

Move expensive operations to:
- `useMemo` hooks
- `useCallback` hooks
- Outside of render cycle

```typescript
// Bad - recalculated on every render
const sorted = items.sort((a, b) => a.id - b.id);

// Good - memoized
const sorted = useMemo(() => items.sort((a, b) => a.id - b.id), [items]);
```

### High memory usage

**Symptoms:**
- App crashes after prolonged use
- Device becomes sluggish
- Memory warnings

**Solutions:**

#### 1. Clean Up Resources

Remove listeners and subscriptions in cleanup functions:

```typescript
useEffect(() => {
  const subscription = watchLocation(callback);

  return () => {
    // Clean up
    subscription.remove();
  };
}, []);
```

#### 2. Avoid Memory Leaks

Check for:
- Global variables holding references
- Closures capturing large objects
- Event listeners not removed

#### 3. Optimize Images

- Use compressed images
- Resize images to appropriate dimensions
- Consider using a CDN for images

---

## Getting Help

If you've tried all solutions and still have issues:

### 1. Check Documentation

- [SETUP.md](SETUP.md) - Installation and configuration
- [SEEDING.md](SEEDING.md) - Database setup
- [README.md](README.md) - Overview and features
- [MVP_SUMMARY.md](MVP_SUMMARY.md) - Implementation details

### 2. Check Official Documentation

- [Expo Docs](https://docs.expo.dev)
- [React Native Docs](https://reactnative.dev)
- [Supabase Docs](https://supabase.com/docs)
- [React Navigation Docs](https://reactnavigation.org)

### 3. Search for Issues

- Check GitHub issues in the repository
- Search Stack Overflow with error messages
- Check Expo forums

### 4. Create an Issue

If you found a bug:

1. Include:
   - Device and OS version
   - Expo and React Native version
   - Steps to reproduce
   - Expected vs actual behavior
   - Console logs/errors

2. Use a descriptive title
3. Tag with relevant labels

---

## Quick Reference

### Common Commands

```bash
# Start development server
npm start

# Clear cache
npx expo start -c

# Type checking
npm run type-check

# Reinstall dependencies
rm -rf node_modules && npm install

# Seed database
npm run seed
```

### Environment Variables

```bash
# Check current .env
cat .env

# Edit .env
nano .env

# Copy example
cp .env.example .env
```

### Database Queries

```sql
-- Check connection
SELECT 1;

-- Check table counts
SELECT COUNT(*) FROM stops;
SELECT COUNT(*) FROM lines;
SELECT COUNT(*) FROM routes;

-- Check indexes
SELECT indexname, tablename FROM pg_indexes;
```

---

## Summary

This troubleshooting guide covers the most common issues. Remember:

✅ Most issues are configuration-related
✅ Check console logs first
✅ Test Supabase connection manually
✅ Clear cache and restart often
✅ Keep documentation updated

Still stuck? Check the [Setup Guide](SETUP.md) or create an issue on the repository!
