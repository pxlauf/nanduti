# Seeding Supabase with Asunción Bus Data

This guide explains how to populate your Supabase database with realistic Asunción bus lines, stops, and routes.

## Prerequisites

1. A Supabase project with the database schema already created
2. Access to the Supabase SQL Editor or `psql` command line tool
3. The schema should be applied first (see `docs/schema.sql`)

## Seed Files Overview

The seeding process uses the following files in order:

1. **`seeds/00_drop_all.sql`** - Optional: Resets all data (useful for testing)
2. **`seeds/stops.sql`** - Inserts ~120 bus stops with coordinates
3. **`seeds/lines.sql`** - Inserts 15 bus lines with colors and descriptions
4. **`seeds/routes.sql`** - Associates stops with lines in order
5. **`seeds/polylines.sql`** - Adds GeoJSON geometries for map visualization

## Method 1: Using Supabase SQL Editor (Web Interface)

### Step 1: Open SQL Editor

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**

### Step 2: Run Seed Files in Order

Copy and paste the contents of each seed file into the SQL Editor and run them in order:

```sql
-- First, optionally reset existing data:
-- Copy contents of seeds/00_drop_all.sql and run

-- Then insert stops:
-- Copy contents of seeds/stops.sql and run

-- Then insert lines:
-- Copy contents of seeds/lines.sql and run

-- Then insert routes:
-- Copy contents of seeds/routes.sql and run

-- Finally, insert polylines:
-- Copy contents of seeds/polylines.sql and run
```

**Important:** Run the files in the exact order shown above to respect foreign key constraints.

## Method 2: Using psql Command Line

If you prefer using the command line:

### Step 1: Get Your Database Connection String

From your Supabase dashboard:
1. Go to **Settings** → **Database**
2. Copy the **Connection string** (you'll need your database password)

The connection string looks like:
```
postgresql://postgres:[YOUR-PASSWORD]@[PROJECT-REF].supabase.co:5432/postgres
```

### Step 2: Run Seed Files

Execute each seed file in order:

```bash
# Set your database password (replace YOUR-PASSWORD)
export DB_PASSWORD="your_password_here"

# Run each seed file in order
psql $DATABASE_URL -f seeds/00_drop_all.sql
psql $DATABASE_URL -f seeds/stops.sql
psql $DATABASE_URL -f seeds/lines.sql
psql $DATABASE_URL -f seeds/routes.sql
psql $DATABASE_URL -f seeds/polylines.sql
```

Or run them all at once:

```bash
psql $DATABASE_URL -f seeds/00_drop_all.sql \
  -f seeds/stops.sql \
  -f seeds/lines.sql \
  -f seeds/routes.sql \
  -f seeds/polylines.sql
```

## Method 3: Using Supabase CLI

If you have the Supabase CLI installed:

```bash
# Link to your project (first time only)
supabase link --project-ref YOUR_PROJECT_REF

# Run seed files
supabase db execute -f seeds/00_drop_all.sql
supabase db execute -f seeds/stops.sql
supabase db execute -f seeds/lines.sql
supabase db execute -f seeds/routes.sql
supabase db execute -f seeds/polylines.sql
```

## Verification

After seeding, verify the data was inserted correctly:

```sql
-- Check stops count (should be ~120)
SELECT COUNT(*) FROM stops;

-- Check lines count (should be 15)
SELECT COUNT(*) FROM lines;

-- Check routes count (should be ~170)
SELECT COUNT(*) FROM routes;

-- Check polylines count (should be 15)
SELECT COUNT(*) FROM line_polylines;

-- View all lines with stop counts
SELECT 
    l.name,
    l.description,
    l.color,
    COUNT(r.stop_id) as stop_count
FROM lines l
LEFT JOIN routes r ON l.id = r.line_id
GROUP BY l.id, l.name, l.description, l.color
ORDER BY l.id;

-- View major hubs and lines that serve them
SELECT 
    s.name as stop_name,
    COUNT(r.line_id) as line_count,
    STRING_AGG(l.name, ', ') as lines
FROM stops s
JOIN routes r ON s.id = r.stop_id
JOIN lines l ON r.line_id = l.id
WHERE s.name IN ('Estación Central', 'Plaza de los Héroes', 'Plaza España', 'Mercado Cuatro')
GROUP BY s.id, s.name
ORDER BY line_count DESC;
```

## Data Reference

A JSON reference of all lines and routes is available at:
- **`data/bus_lines.json`** - Complete catalog of lines, stops, and transfer hubs

## Resetting Data

To start fresh and remove all seeded data:

```sql
-- Run the drop script
\i seeds/00_drop_all.sql
```

Or execute directly:
```sql
DELETE FROM line_polylines;
DELETE FROM routes;
DELETE FROM lines;
DELETE FROM stops;
```

Then re-run the seed files as described above.

## Troubleshooting

### Foreign Key Constraint Errors

If you get foreign key constraint errors, ensure you're running the files in the correct order:
1. `stops.sql` (must be first)
2. `lines.sql` (must be second)
3. `routes.sql` (depends on stops and lines)
4. `polylines.sql` (depends on lines)

### Duplicate Key Errors

If you encounter duplicate key errors, run `00_drop_all.sql` first to clear existing data.

### Missing Data After Seeding

Verify each step completed successfully by checking the row counts:
- Stops: ~120 rows
- Lines: 15 rows
- Routes: ~170 rows
- Polylines: 15 rows

## Coordinate System

All coordinates are in decimal degrees (WGS 84 format):
- Latitude range: -25.2637° to -25.2500°
- Longitude range: -57.5800° to -57.5500°

These are realistic coordinates for Asunción, Paraguay.

## Next Steps

After seeding your database, you can:
1. Query the `v_route_details` view for complete route information
2. Use the `v_lines_summary` view for line overviews with polylines
3. Build a map application using the GeoJSON polylines
4. Implement route finding between stops
5. Display transfer opportunities at major hubs

## Support

For issues with the schema or seeding, refer to:
- `docs/schema.sql` - Database schema definitions
- `docs/SCHEMA.md` - Schema documentation
- `docs/SUPABASE_SETUP.md` - Supabase setup guide
