-- =============================================================================
-- Ñanduti Database Schema
-- Transit routing application with stops, lines, routes, and polylines
-- Created for Supabase (PostgreSQL)
-- =============================================================================

-- Enable UUID extension for potential future use
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- STOPS TABLE
-- Stores geographic locations for transit stops
-- =============================================================================
CREATE TABLE IF NOT EXISTS stops (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,                      -- Stop name in Spanish (e.g., "Plaza de la Democracia")
    latitude DECIMAL(10, 8) NOT NULL,        -- Geographic latitude (-90 to 90)
    longitude DECIMAL(11, 8) NOT NULL,       -- Geographic longitude (-180 to 180)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Index for efficient location-based queries
CREATE INDEX IF NOT EXISTS idx_stops_location 
    ON stops (latitude, longitude);

-- =============================================================================
-- LINES TABLE
-- Stores transit line information with visual styling
-- =============================================================================
CREATE TABLE IF NOT EXISTS lines (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,               -- Line identifier (e.g., "Línea 1", "Línea 2")
    description TEXT,                        -- Route description (e.g., "Zona Sur → Centro")
    color TEXT,                              -- Hex color for map visualization (#FF0000, #0000FF)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- =============================================================================
-- ROUTES TABLE
-- Junction table defining which stops each line serves, in order
-- =============================================================================
CREATE TABLE IF NOT EXISTS routes (
    id BIGSERIAL PRIMARY KEY,
    line_id BIGINT NOT NULL,                 -- Foreign key to lines table
    stop_id BIGINT NOT NULL,                 -- Foreign key to stops table
    stop_order INTEGER NOT NULL,             -- Order of stop within the line (1, 2, 3...)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    
    -- Foreign key constraints with CASCADE delete
    CONSTRAINT fk_routes_line
        FOREIGN KEY (line_id) 
        REFERENCES lines(id) 
        ON DELETE CASCADE,
    CONSTRAINT fk_routes_stop
        FOREIGN KEY (stop_id) 
        REFERENCES stops(id) 
        ON DELETE CASCADE,
    
    -- Ensure unique line + stop combination
    CONSTRAINT uq_routes_line_stop UNIQUE (line_id, stop_id)
);

-- Indexes for efficient lookups
CREATE INDEX IF NOT EXISTS idx_routes_line ON routes (line_id);
CREATE INDEX IF NOT EXISTS idx_routes_stop ON routes (stop_id);

-- =============================================================================
-- LINE_POLYLINES TABLE
-- Stores GeoJSON polylines for drawing routes on the map
-- =============================================================================
CREATE TABLE IF NOT EXISTS line_polylines (
    id BIGSERIAL PRIMARY KEY,
    line_id BIGINT NOT NULL UNIQUE,          -- One polyline per line
    geojson JSONB NOT NULL,                  -- GeoJSON FeatureCollection with LineString
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    
    -- Foreign key constraint with CASCADE delete
    CONSTRAINT fk_polylines_line
        FOREIGN KEY (line_id) 
        REFERENCES lines(id) 
        ON DELETE CASCADE
);

-- Index for potential JSONB queries
CREATE INDEX IF NOT EXISTS idx_polylines_geojson ON line_polylines USING GIN (geojson);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS)
-- Configure public read-only access for MVP (no authentication required)
-- =============================================================================

-- Enable RLS on all tables
ALTER TABLE stops ENABLE ROW LEVEL SECURITY;
ALTER TABLE lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE line_polylines ENABLE ROW LEVEL SECURITY;

-- Create policies for public SELECT access
-- All tables allow anyone to read data (authenticated or not)
CREATE POLICY "Enable read access for all users" ON stops
    FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON lines
    FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON routes
    FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON line_polylines
    FOR SELECT USING (true);

-- =============================================================================
-- VIEWS (Optional - Useful for common queries)
-- =============================================================================

-- View: Complete route information with line and stop details
CREATE OR REPLACE VIEW v_route_details AS
SELECT 
    r.id AS route_id,
    r.stop_order,
    l.id AS line_id,
    l.name AS line_name,
    l.description AS line_description,
    l.color AS line_color,
    s.id AS stop_id,
    s.name AS stop_name,
    s.latitude,
    s.longitude
FROM routes r
INNER JOIN lines l ON r.line_id = l.id
INNER JOIN stops s ON r.stop_id = s.id
ORDER BY l.name, r.stop_order;

-- View: Line with its complete polyline and stop count
CREATE OR REPLACE VIEW v_lines_summary AS
SELECT 
    l.id,
    l.name,
    l.description,
    l.color,
    l.created_at,
    lp.geojson,
    COUNT(DISTINCT r.stop_id) AS stop_count
FROM lines l
LEFT JOIN line_polylines lp ON l.id = lp.line_id
LEFT JOIN routes r ON l.id = r.line_id
GROUP BY l.id, lp.id;

-- =============================================================================
-- SAMPLE DATA (Optional - Uncomment to insert test data)
-- =============================================================================

-- Insert sample stops (example coordinates for Asunción, Paraguay)
-- INSERT INTO stops (name, latitude, longitude) VALUES
--     ('Plaza de la Independencia', -25.2821, -57.5759),
--     ('Paseo La Galeria', -25.2890, -57.5732),
--     ('Shopping del Sol', -25.2978, -57.5590),
--     ('Cerro Corá', -25.3067, -57.5523);

-- Insert sample lines
-- INSERT INTO lines (name, description, color) VALUES
--     ('Línea 1', 'Zona Sur → Centro', '#FF0000'),
--     ('Línea 2', 'Zona Norte → Centro', '#0000FF'),
--     ('Línea 3', 'Este → Oeste', '#00FF00');

-- Insert sample routes (example for Línea 1)
-- INSERT INTO routes (line_id, stop_id, stop_order) VALUES
--     (1, 1, 1),
--     (1, 2, 2),
--     (1, 3, 3),
--     (1, 4, 4);

-- Insert sample polyline for Línea 1
-- INSERT INTO line_polylines (line_id, geojson) VALUES (
--     1,
--     '{
--         "type": "FeatureCollection",
--         "features": [{
--             "type": "Feature",
--             "properties": {},
--             "geometry": {
--                 "type": "LineString",
--                 "coordinates": [
--                     [-57.5759, -25.2821],
--                     [-57.5732, -25.2890],
--                     [-57.5590, -25.2978],
--                     [-57.5523, -25.3067]
--                 ]
--             }
--         }]
--     }'::jsonb
-- );

-- =============================================================================
-- VERIFICATION QUERIES
-- Run these to verify the schema was created correctly
-- =============================================================================

-- Check all tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
    AND table_type = 'BASE TABLE'
ORDER BY table_name;
-- Expected: line_polylines, lines, routes, stops

-- Check indexes exist
SELECT indexname, indexdef FROM pg_indexes 
WHERE schemaname = 'public' 
ORDER BY indexname;
-- Expected: idx_stops_location, idx_routes_line, idx_routes_stop, idx_polylines_geojson

-- Check RLS is enabled
SELECT 
    relname AS table_name,
    relrowsecurity AS rls_enabled
FROM pg_class
WHERE relname IN ('stops', 'lines', 'routes', 'line_polylines')
ORDER BY relname;
-- Expected: all tables should show rls_enabled = true

-- Check RLS policies
SELECT policyname, tablename, cmd 
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename;
-- Expected: 4 policies (one SELECT policy per table)

-- Check foreign key constraints
SELECT 
    conname,
    conrelid::regclass AS referencing_table,
    confrelid::regclass AS referenced_table,
    confdeltype
FROM pg_constraint 
WHERE contype = 'f' 
ORDER BY conname;
-- Expected: fk_routes_line, fk_routes_stop, fk_polylines_line
