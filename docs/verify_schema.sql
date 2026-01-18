-- =============================================================================
-- SCHEMA VERIFICATION QUERIES
-- Run these queries in Supabase SQL Editor to verify installation
-- =============================================================================

-- =============================================================================
-- 1. VERIFY ALL TABLES EXIST
-- =============================================================================
SELECT 'Checking tables...' AS check_type;

SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
    AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- Expected results (4 tables):
-- line_polylines
-- lines
-- routes
-- stops

-- =============================================================================
-- 2. VERIFY ALL COLUMNS IN EACH TABLE
-- =============================================================================
SELECT 'Checking stops columns...' AS check_type;
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'stops'
ORDER BY ordinal_position;

SELECT 'Checking lines columns...' AS check_type;
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'lines'
ORDER BY ordinal_position;

SELECT 'Checking routes columns...' AS check_type;
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'routes'
ORDER BY ordinal_position;

SELECT 'Checking line_polylines columns...' AS check_type;
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'line_polylines'
ORDER BY ordinal_position;

-- =============================================================================
-- 3. VERIFY ALL INDEXES EXIST
-- =============================================================================
SELECT 'Checking indexes...' AS check_type;

SELECT 
    indexname,
    indexdef
FROM pg_indexes 
WHERE schemaname = 'public' 
    AND tablename IN ('stops', 'lines', 'routes', 'line_polylines')
ORDER BY tablename, indexname;

-- Expected indexes:
-- stops: idx_stops_location, stops_id_seq (primary key)
-- lines: lines_id_seq (primary key)
-- routes: idx_routes_line, idx_routes_stop, routes_id_seq (primary key)
-- line_polylines: idx_polylines_geojson, line_polylines_id_seq (primary key)

-- =============================================================================
-- 4. VERIFY ROW LEVEL SECURITY (RLS) IS ENABLED
-- =============================================================================
SELECT 'Checking RLS enabled...' AS check_type;

SELECT 
    relname AS table_name,
    relrowsecurity AS rls_enabled
FROM pg_class
WHERE relname IN ('stops', 'lines', 'routes', 'line_polylines')
    AND relnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
ORDER BY relname;

-- Expected: all tables should show rls_enabled = true

-- =============================================================================
-- 5. VERIFY RLS POLICIES
-- =============================================================================
SELECT 'Checking RLS policies...' AS check_type;

SELECT 
    policyname,
    tablename,
    cmd,
    CASE WHEN qual IS NOT NULL THEN 'Active' ELSE 'No qualifier' END AS status
FROM pg_policies 
WHERE schemaname = 'public'
    AND tablename IN ('stops', 'lines', 'routes', 'line_polylines')
ORDER BY tablename;

-- Expected: 4 policies (one SELECT policy per table)

-- =============================================================================
-- 6. VERIFY FOREIGN KEY CONSTRAINTS
-- =============================================================================
SELECT 'Checking foreign keys...' AS check_type;

SELECT 
    conname AS constraint_name,
    conrelid::regclass AS referencing_table,
    confrelid::regclass AS referenced_table,
    CASE confdeltype
        WHEN 'c' THEN 'CASCADE'
        WHEN 'r' THEN 'RESTRICT'
        WHEN 'n' THEN 'SET NULL'
        WHEN 'd' THEN 'SET DEFAULT'
        ELSE 'NO ACTION'
    END AS on_delete
FROM pg_constraint 
WHERE contype = 'f'
    AND conrelid IN (
        SELECT oid FROM pg_class 
        WHERE relname IN ('routes', 'line_polylines')
    )
ORDER BY conrelid::regclass::text;

-- Expected constraints:
-- fk_routes_line → routes → lines (CASCADE)
-- fk_routes_stop → routes → stops (CASCADE)
-- fk_polylines_line → line_polylines → lines (CASCADE)

-- =============================================================================
-- 7. VERIFY UNIQUE CONSTRAINTS
-- =============================================================================
SELECT 'Checking unique constraints...' AS check_type;

SELECT 
    conname AS constraint_name,
    conrelid::regclass AS table_name,
    pg_get_constraintdef(oid) AS definition
FROM pg_constraint 
WHERE contype = 'u'
    AND conrelid IN (
        SELECT oid FROM pg_class 
        WHERE relname IN ('lines', 'routes', 'line_polylines')
    )
ORDER BY conrelid::regclass::text;

-- Expected constraints:
-- lines_name_key → UNIQUE (name)
-- uq_routes_line_stop → UNIQUE (line_id, stop_id)
-- line_polylines_line_id_key → UNIQUE (line_id)

-- =============================================================================
-- 8. TEST INSERT (Optional - will be rolled back in transaction)
-- =============================================================================
SELECT 'Testing insert operations...' AS check_type;

BEGIN;

-- Test insert into stops
INSERT INTO stops (name, latitude, longitude) 
VALUES ('Test Stop', -25.2821, -57.5759)
RETURNING id AS test_stop_id;

-- Test insert into lines
INSERT INTO lines (name, description, color) 
VALUES ('Test Line', 'Test Description', '#FFFFFF')
RETURNING id AS test_line_id;

-- Test insert into routes (using returned IDs)
DO $$
DECLARE
    test_stop_id BIGINT;
    test_line_id BIGINT;
BEGIN
    SELECT id INTO test_stop_id FROM stops WHERE name = 'Test Stop' LIMIT 1;
    SELECT id INTO test_line_id FROM lines WHERE name = 'Test Line' LIMIT 1;
    INSERT INTO routes (line_id, stop_id, stop_order) 
    VALUES (test_line_id, test_stop_id, 1);
END $$;

-- Test insert into line_polylines
DO $$
DECLARE
    test_line_id BIGINT;
BEGIN
    SELECT id INTO test_line_id FROM lines WHERE name = 'Test Line' LIMIT 1;
    INSERT INTO line_polylines (line_id, geojson) 
    VALUES (test_line_id, '{"type": "FeatureCollection", "features": []}'::jsonb);
END $$;

ROLLBACK;

SELECT 'All tests passed!' AS result;

-- =============================================================================
-- SUMMARY
-- =============================================================================
SELECT 'VERIFICATION COMPLETE' AS status;
SELECT 'All checks above should show expected results. If any check fails, review the schema.sql file.' AS note;
