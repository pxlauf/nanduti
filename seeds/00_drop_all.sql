-- =============================================================================
-- Drop All Seed Data
-- Use this script to reset all data for testing
-- =============================================================================
-- WARNING: This will delete all data from stops, lines, routes, and line_polylines tables

-- Delete in correct order due to foreign key constraints
DELETE FROM line_polylines;
DELETE FROM routes;
DELETE FROM lines;
DELETE FROM stops;

-- Verify deletion
SELECT 'All data deleted successfully' AS status;
