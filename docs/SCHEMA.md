# Ñanduti Database Schema Documentation

## Overview

Ñanduti is a transit routing application that manages bus routes, stops, and polylines for map visualization. The database is built on PostgreSQL (Supabase) with Row Level Security configured for public read-only access.

## Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              Ñanduti ERD                                         │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│    ┌──────────┐                    ┌──────────┐                                  │
│    │   stops  │                    │   lines  │                                  │
│    ├──────────┤                    ├──────────┤                                  │
│    │ id (PK)  │◄────────┐   ┌─────►│ id (PK)  │                                  │
│    │ name     │         │   │      │ name     │                                  │
│    │ latitude │         │   │      │ description                              │
│    │ longitude│         │   │      │ color    │                                  │
│    │ created_at         │   │      │ created_at                                │
│    └──────────┘         │   │      └──────────┘                                  │
│         ▲               │   │           │                                        │
│         │               │   │           │                                        │
│         │               │   │           │                                        │
│    ┌────┴────┐          │   │      ┌────┴──────┐                                │
│    │ routes  │          │   │      │line_poly  │                                │
│    ├─────────┤          │   │      │ lines     │                                │
│    │ id (PK) │          │   │      ├──────────┤                                │
│    │line_id(FK)         │   │      │ id (PK)  │                                │
│    │stop_id (FK)        │   │      │line_id(FK) UNIQUE                           │
│    │stop_order          │   │      │ geojson   │                                │
│    │ created_at         │   │      │ created_at                                │
│    └─────────┘          │   │      └──────────┘                                │
│         │               │   │           │                                      │
│         │               │   │           │                                      │
│         └───────┬───────┘   │           │                                      │
│                 │           │           │                                      │
│         ┌───────▼───────────┴───────────┘                                      │
│         │                                                                   │
│         │    routes is a junction table linking stops to lines               │
│         │    with an ordered sequence (stop_order)                           │
│         │                                                                   │
│         └───────────────────────────────────────────────────────────────────┘
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Table Details

### 1. stops

Stores geographic locations for transit stops.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGSERIAL | PRIMARY KEY | Unique identifier, auto-increment |
| `name` | TEXT | NOT NULL | Stop name in Spanish (e.g., "Plaza de la Independencia") |
| `latitude` | DECIMAL(10,8) | NOT NULL | Geographic latitude (-90 to 90) |
| `longitude` | DECIMAL(11,8) | NOT NULL | Geographic longitude (-180 to 180) |
| `created_at` | TIMESTAMP WITH TIME ZONE | DEFAULT NOW() | Record creation timestamp |

**Indexes:**
- `idx_stops_location` on `(latitude, longitude)` - Optimizes location-based queries

**Example:**
```sql
INSERT INTO stops (name, latitude, longitude) 
VALUES ('Plaza de la Independencia', -25 -57.575.2821,9);
```

---

### 2. lines

Stores transit line information with visual styling for map display.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGSERIAL | PRIMARY KEY | Unique identifier, auto-increment |
| `name` | TEXT | NOT NULL UNIQUE | Line identifier (e.g., "Línea 1", "Línea 2") |
| `description` | TEXT | - | Route description (e.g., "Zona Sur → Centro") |
| `color` | TEXT | - | Hex color for map visualization (#FF0000, #0000FF) |
| `created_at` | TIMESTAMP WITH TIME ZONE | DEFAULT NOW() | Record creation timestamp |

**Indexes:**
- Unique constraint on `name`

**Example:**
```sql
INSERT INTO lines (name, description, color) 
VALUES ('Línea 1', 'Zona Sur → Centro', '#FF0000');
```

---

### 3. routes

Junction table that defines which stops each line serves and in what order.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGSERIAL | PRIMARY KEY | Unique identifier, auto-increment |
| `line_id` | BIGINT | NOT NULL, FK → lines(id) | Reference to the line |
| `stop_id` | BIGINT | NOT NULL, FK → stops(id) | Reference to the stop |
| `stop_order` | INTEGER | NOT NULL | Position of stop in the line (1, 2, 3...) |
| `created_at` | TIMESTAMP WITH TIME ZONE | DEFAULT NOW() | Record creation timestamp |

**Indexes:**
- `idx_routes_line` on `(line_id)` - Optimizes line-based route lookups
- `idx_routes_stop` on `(stop_id)` - Optimizes stop-based route lookups

**Constraints:**
- Unique constraint: `(line_id, stop_id)` - Prevents duplicate stops on same line
- Foreign key `fk_routes_line` → `lines(id)` with CASCADE DELETE
- Foreign key `fk_routes_stop` → `stops(id)` with CASCADE DELETE

**Relationships:**
- A line has many routes
- A stop has many routes
- Routes represent the ordered sequence of stops for a line

**Example:**
```sql
INSERT INTO routes (line_id, stop_id, stop_order) VALUES
    (1, 1, 1),
    (1, 2, 2),
    (1, 3, 3);
```

---

### 4. line_polylines

Stores GeoJSON polylines for drawing routes on the map.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGSERIAL | PRIMARY KEY | Unique identifier, auto-increment |
| `line_id` | BIGINT | NOT NULL UNIQUE, FK → lines(id) | Reference to the line (one polyline per line) |
| `geojson` | JSONB | NOT NULL | GeoJSON FeatureCollection with LineString geometry |
| `created_at` | TIMESTAMP WITH TIME ZONE | DEFAULT NOW() | Record creation timestamp |

**Indexes:**
- `idx_polylines_geojson` on `(geojson)` using GIN - Optimizes JSONB queries
- Unique constraint on `line_id` - Ensures only one polyline per line

**Constraints:**
- Foreign key `fk_polylines_line` → `lines(id)` with CASCADE DELETE

**GeoJSON Format:**
```json
{
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [longitude1, latitude1],
                [longitude2, latitude2],
                ...
            ]
        }
    }]
}
```

**Example:**
```sql
INSERT INTO line_polylines (line_id, geojson) VALUES (
    1,
    '{
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [-57.5759, -25.2821],
                    [-57.5732, -25.2890]
                ]
            }
        }]
    }'::jsonb
);
```

---

## Row Level Security (RLS)

All tables have RLS enabled with public SELECT access. This means:

- **SELECT**: Anyone (authenticated or anonymous) can read data
- **INSERT/UPDATE/DELETE**: Blocked by default (no policies defined)

This configuration supports the MVP use case where transit information is publicly viewable without authentication.

---

## Database Relationships

```
stops 1 ──────►◄────── 1 lines
   │                        │
   │                        │
   ▼                        ▼
routes (junction) ─────► line_polylines
```

| Relationship | Type | Description |
|--------------|------|-------------|
| lines ↔ routes | One-to-Many | A line has many route stops |
| stops ↔ routes | One-to-Many | A stop can be on many lines |
| lines ↔ line_polylines | One-to-One | Each line has exactly one polyline |

---

## Useful Views

### v_route_details
Provides complete route information with line and stop details joined.

```sql
SELECT * FROM v_route_details ORDER BY line_name, stop_order;
```

Columns: `route_id`, `stop_order`, `line_id`, `line_name`, `line_description`, `line_color`, `stop_id`, `stop_name`, `latitude`, `longitude`

### v_lines_summary
Provides a summary of each line with stop count.

```sql
SELECT * FROM v_lines_summary;
```

Columns: `id`, `name`, `description`, `color`, `created_at`, `geojson`, `stop_count`

---

## Sample Queries

### Get all stops for a specific line
```sql
SELECT s.*, r.stop_order
FROM routes r
JOIN stops s ON r.stop_id = s.id
WHERE r.line_id = 1
ORDER BY r.stop_order;
```

### Get line with its polyline
```sql
SELECT l.*, lp.geojson
FROM lines l
LEFT JOIN line_polylines lp ON l.id = lp.line_id
WHERE l.id = 1;
```

### Find stops near a location (within bounding box)
```sql
SELECT *
FROM stops
WHERE latitude BETWEEN -25.3 AND -25.2
  AND longitude BETWEEN -57.6 AND -57.5;
```

### Delete a line and all related data (CASCADE)
```sql
DELETE FROM lines WHERE id = 1;
-- This automatically deletes:
-- - All routes for this line
-- - The polyline for this line
```

---

## Data Types Reference

| Type | Range | Use Case |
|------|-------|----------|
| BIGSERIAL | 1 to 9,223,372,036,854,775,807 | Primary keys |
| DECIMAL(10,8) | Up to 10 digits total, 8 decimal places | Latitude |
| DECIMAL(11,8) | Up to 11 digits total, 8 decimal places | Longitude |
| INTEGER | -2,147,483,648 to 2,147,483,647 | Stop order, indexing |
| TEXT | Variable length | Names, descriptions, hex colors |
| JSONB | Binary JSON | GeoJSON polylines |
| TIMESTAMP WITH TIME ZONE | All time zones | created_at timestamps |

---

## Foreign Key Behaviors

All foreign keys use `ON DELETE CASCADE`, meaning:

- Deleting a **line** → deletes all its routes and polyline
- Deleting a **stop** → deletes all routes referencing that stop

This ensures referential integrity is maintained automatically.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2024-01-18 | Initial schema creation |
