# Supabase Setup Guide for Ñanduti

This guide walks you through creating a new Supabase project and running the database schema.

## Prerequisites

- A Google account (for Supabase authentication)
- Modern web browser (Chrome, Firefox, Edge)

## Step 1: Create a Supabase Account

1. Go to [Supabase.com](https://supabase.com)
2. Click "Start your project" or "Sign Up"
3. Sign up using your Google account
4. Complete the onboarding (you can skip the templates for now)

## Step 2: Create a New Project

1. In the Supabase Dashboard, click "New Project"
2. Fill in the project details:
   - **Name**: `nanduti` (or your preferred name)
   - **Database Password**: Generate a strong password and save it securely
   - **Region**: Select the region closest to your users (e.g., `US East (N. Virginia)` for US users, or `South America (São Paulo)` for Paraguay users)
3. Click "Create new project"
4. Wait 1-2 minutes for the project to initialize

## Step 3: Get Project Credentials

Once your project is ready:

1. Go to **Project Settings** (gear icon) → **API**
2. Note down these values:
   - **Project URL**: `https://[your-project-ref].supabase.co`
   - **anon public key**: `eyJ...` (used for client-side queries)
   - **service_role key**: `eyJ...` (server-side only, keep secret!)

3. Go to **Project Settings** → **Database**
4. Note down:
   - **Host**: `db.[your-project-ref].supabase.co`
   - **Database name**: `postgres`
   - **Port**: `5432`
   - **User**: `postgres`

## Step 4: Run the Database Schema

### Option A: Using Supabase SQL Editor (Recommended)

1. In your Supabase Dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy the contents of `docs/schema.sql`
4. Paste into the SQL Editor
5. Click "Run" (or press Ctrl+Enter)
6. Verify success - you should see "Success. No rows returned" for each statement

### Option B: Using psql Command Line

1. Install PostgreSQL client if needed:
   ```bash
   # macOS
   brew install postgresql

   # Ubuntu/Debian
   sudo apt-get install postgresql-client

   # Windows
   # Download from https://www.postgresql.org/download/windows/
   ```

2. Connect to your database:
   ```bash
   PGPASSWORD=[your-password] psql -h db.[your-project-ref].supabase.co -U postgres -d postgres
   ```

3. Run the schema:
   ```bash
   PGPASSWORD=[your-password] psql -h db.[your-project-ref].supabase.co -U postgres -d postgres -f docs/schema.sql
   ```

## Step 5: Verify Schema Installation

Run these verification queries in the SQL Editor:

```sql
-- 1. Check all tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

Expected output:
```
 line_polylines
 lines
 routes
 stops
```

```sql
-- 2. Check indexes
SELECT indexname, indexdef FROM pg_indexes 
WHERE schemaname = 'public' 
ORDER BY indexname;
```

Expected indexes:
- idx_polylines_geojson
- idx_routes_line
- idx_routes_stop
- idx_stops_location
- Primary key indexes for each table

```sql
-- 3. Check RLS policies
SELECT policyname, tablename, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public';
```

Expected policies: 4 policies (one SELECT policy per table)

```sql
-- 4. Check foreign key constraints
SELECT conname, conrelid::regclass, confrelid::regclass, confdeltype
FROM pg_constraints 
WHERE contype = 'f';
```

Expected constraints:
- fk_polylines_line → line_polylines → lines
- fk_routes_line → routes → lines
- fk_routes_stop → routes → stops

## Step 6: Configure Environment Variables

Create a `.env` file in your project root:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Step 7: Test the API

You can test your Supabase API using curl:

```bash
# List all stops (should work without authentication due to RLS)
curl "https://your-project-ref.supabase.co/rest/v1/stops" \
  -H "apikey: your-anon-public-key" \
  -H "Authorization: Bearer your-anon-public-key"
```

## Troubleshooting

### "Connection refused" errors
- Check your IP is allowed in Supabase → Authentication → Settings → URL Configuration
- Add your current IP to the allowed list

### RLS policy errors
- Ensure RLS is enabled on all tables
- Verify policies were created correctly

### Schema errors
- Check you're using the SQL Editor (not the Table Editor)
- Ensure no syntax errors in the SQL

## Next Steps

- Add your transit data (stops, lines, routes, polylines)
- Build your frontend application
- Connect to Supabase using your preferred SDK

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Reference](https://www.postgresql.org/docs/)
- [GeoJSON Specification](https://tools.ietf.org/html/rfc7946)
