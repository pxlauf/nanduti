-- =============================================================================
-- Asunción Bus Line Polylines
-- GeoJSON LineString geometries for drawing routes on map
-- Simplified paths connecting stops in order
-- =============================================================================

-- Línea 1: Estación Central → Zona Sur
INSERT INTO line_polylines (line_id, geojson) VALUES
(1, '{
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "properties": {"name": "Línea 1"},
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-57.57489, -25.26542],
                [-57.56823, -25.25789],
                [-57.56678, -25.25934],
                [-57.55891, -25.26312],
                [-57.56012, -25.26234],
                [-57.55934, -25.26356],
                [-57.56145, -25.26278],
                [-57.56012, -25.25834],
                [-57.55867, -25.26112],
                [-57.55789, -25.26123],
                [-57.55823, -25.26045],
                [-57.55612, -25.26234],
                [-57.57123, -25.25823]
            ]
        }
    }]
}'::jsonb);

-- Línea 2: Terminal de Ómnibus → Barrio Obrero
INSERT INTO line_polylines (line_id, geojson) VALUES
(2, '{
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "properties": {"name": "Línea 2"},
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-57.57012, -25.26845],
                [-57.57489, -25.26542],
                [-57.56823, -25.25789],
                [-57.56234, -25.26015],
                [-57.55891, -25.26312],
                [-57.55823, -25.26034],
                [-57.56012, -25.26234],
                [-57.55867, -25.26112],
                [-57.56345, -25.26245],
                [-57.55789, -25.26123],
                [-57.55612, -25.26234],
                [-57.55712, -25.26078]
            ]
        }
    }]
}'::jsonb);

-- Línea 3: Plaza España → Villa Morra
INSERT INTO line_polylines (line_id, geojson) VALUES
(3, '{
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "properties": {"name": "Línea 3"},
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-57.56234, -25.26015],
                [-57.56823, -25.25789],
                [-57.56534, -25.25998],
                [-57.56678, -25.25934],
                [-57.56489, -25.25912],
                [-57.57234, -25.25745],
                [-57.56423, -25.25456],
                [-57.56512, -25.25389],
                [-57.56567, -25.25345],
                [-57.56689, -25.25412],
                [-57.56123, -25.25967],
                [-57.56234, -25.25889],
                [-57.55823, -25.26034]
            ]
        }
    }]
}'::jsonb);

-- Línea 4: Mercado Cuatro → Santísima Trinidad
INSERT INTO line_polylines (line_id, geojson) VALUES
(4, '{
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "properties": {"name": "Línea 4"},
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-57.55891, -25.26312],
                [-57.57489, -25.26542],
                [-57.56823, -25.25789],
                [-57.56234, -25.26015],
                [-57.56234, -25.25889],
                [-57.56123, -25.25967],
                [-57.57234, -25.25745],
                [-57.55734, -25.26145],
                [-57.55712, -25.26067],
                [-57.56145, -25.25789],
                [-57.56312, -25.25589],
                [-57.57189, -25.25712],
                [-57.56823, -25.25345]
            ]
        }
    }]
}'::jsonb);

-- Línea 5: San Vicente → República
INSERT INTO line_polylines (line_id, geojson) VALUES
(5, '{
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "properties": {"name": "Línea 5"},
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-57.57823, -25.26134],
                [-57.57912, -25.26245],
                [-57.57856, -25.26345],
                [-57.57489, -25.26542],
                [-57.56823, -25.25789],
                [-57.56534, -25.25998],
                [-57.57567, -25.25234],
                [-57.57478, -25.25345],
                [-57.57423, -25.25189],
                [-57.57689, -25.25312],
                [-57.56589, -25.25645],
                [-57.56678, -25.25534]
            ]
        }
    }]
}'::jsonb);

-- Línea 6: Costanera → Ycua Satí
INSERT INTO line_polylines (line_id, geojson) VALUES
(6, '{
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "properties": {"name": "Línea 6"},
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-57.57012, -25.26456],
                [-57.57123, -25.26345],
                [-57.57234, -25.26234],
                [-57.56945, -25.26412],
                [-57.57012, -25.26845],
                [-57.57489, -25.26542],
                [-57.56823, -25.25789],
                [-57.56945, -25.26123],
                [-57.56234, -25.25889],
                [-57.56123, -25.25967],
                [-57.56345, -25.25812],
                [-57.56389, -25.25845]
            ]
        }
    }]
}'::jsonb);

-- Línea 7: Zona Caaguazú → Mariscal López
INSERT INTO line_polylines (line_id, geojson) VALUES
(7, '{
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "properties": {"name": "Línea 7"},
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-57.57567, -25.25678],
                [-57.57689, -25.25545],
                [-57.57812, -25.25423],
                [-57.57734, -25.25589],
                [-57.57823, -25.26134],
                [-57.57489, -25.26542],
                [-57.56234, -25.26015],
                [-57.56145, -25.25789],
                [-57.56234, -25.25678],
                [-57.56312, -25.25589],
                [-57.57189, -25.25712],
                [-57.57567, -25.25234],
                [-57.56678, -25.25534]
            ]
        }
    }]
}'::jsonb);

-- Línea 8: Barrio Lido → Pettirossi
INSERT INTO line_polylines (line_id, geojson) VALUES
(8, '{
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "properties": {"name": "Línea 8"},
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-57.57123, -25.25823],
                [-57.57045, -25.25867],
                [-57.57089, -25.25712],
                [-57.56234, -25.25889],
                [-57.56234, -25.26015],
                [-57.56823, -25.25789],
                [-57.56534, -25.25998],
                [-57.55934, -25.25723],
                [-57.55845, -25.25734],
                [-57.55989, -25.25645],
                [-57.56012, -25.25812],
                [-57.56512, -25.26023]
            ]
        }
    }]
}'::jsonb);

-- Línea 9: Próceres → Herrera
INSERT INTO line_polylines (line_id, geojson) VALUES
(9, '{
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "properties": {"name": "Línea 9"},
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-57.57123, -25.25134],
                [-57.57034, -25.25245],
                [-57.56934, -25.25189],
                [-57.57212, -25.25212],
                [-57.56234, -25.25678],
                [-57.56823, -25.25789],
                [-57.56234, -25.26015],
                [-57.56234, -25.25889],
                [-57.57234, -25.25745],
                [-57.55734, -25.25456],
                [-57.55645, -25.25567],
                [-57.55589, -25.25489],
                [-57.55812, -25.25512]
            ]
        }
    }]
}'::jsonb);

-- Línea 10: General Díaz → Eusebio Ayala
INSERT INTO line_polylines (line_id, geojson) VALUES
(10, '{
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "properties": {"name": "Línea 10"},
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-57.57123, -25.25512],
                [-57.57034, -25.25634],
                [-57.56989, -25.25645],
                [-57.57189, -25.25478],
                [-57.57567, -25.25234],
                [-57.56823, -25.25789],
                [-57.56534, -25.25998],
                [-57.56678, -25.25534],
                [-57.56589, -25.25645],
                [-57.56734, -25.25456],
                [-57.56489, -25.25589],
                [-57.56789, -25.25612],
                [-57.56423, -25.25456]
            ]
        }
    }]
}'::jsonb);

-- Línea 11: Circular Centro
INSERT INTO line_polylines (line_id, geojson) VALUES
(11, '{
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "properties": {"name": "Línea 11"},
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-57.57489, -25.26542],
                [-57.56823, -25.25789],
                [-57.56534, -25.25998],
                [-57.56489, -25.25912],
                [-57.56678, -25.25934],
                [-57.56234, -25.26015],
                [-57.55891, -25.26312],
                [-57.57012, -25.26845],
                [-57.56945, -25.26123],
                [-57.56712, -25.25876],
                [-57.56423, -25.25456],
                [-57.57234, -25.25745],
                [-57.56234, -25.25889],
                [-57.56123, -25.25967]
            ]
        }
    }]
}'::jsonb);

-- Línea 12: Bernardino Caballero Loop
INSERT INTO line_polylines (line_id, geojson) VALUES
(12, '{
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "properties": {"name": "Línea 12"},
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-57.55823, -25.26034],
                [-57.55734, -25.26145],
                [-57.55889, -25.25956],
                [-57.55712, -25.26067],
                [-57.55934, -25.25989],
                [-57.56012, -25.26234],
                [-57.55934, -25.26356],
                [-57.55867, -25.26112],
                [-57.56145, -25.26278],
                [-57.55891, -25.26312],
                [-57.56234, -25.26015],
                [-57.56823, -25.25789],
                [-57.57489, -25.26542]
            ]
        }
    }]
}'::jsonb);

-- Línea 13: Zona Industrial Express
INSERT INTO line_polylines (line_id, geojson) VALUES
(13, '{
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "properties": {"name": "Línea 13"},
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-57.55789, -25.26123],
                [-57.55678, -25.25934],
                [-57.55612, -25.26234],
                [-57.55823, -25.26045],
                [-57.55712, -25.26078],
                [-57.56012, -25.26234],
                [-57.55891, -25.26312],
                [-57.57489, -25.26542],
                [-57.56823, -25.25789],
                [-57.57012, -25.26845],
                [-57.57012, -25.26456],
                [-57.57123, -25.26345]
            ]
        }
    }]
}'::jsonb);

-- Línea 14: Intermodal Connection
INSERT INTO line_polylines (line_id, geojson) VALUES
(14, '{
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "properties": {"name": "Línea 14"},
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-57.56678, -25.26512],
                [-57.56012, -25.25834],
                [-57.57123, -25.26245],
                [-57.56345, -25.26245],
                [-57.57489, -25.26542],
                [-57.56234, -25.26015],
                [-57.56823, -25.25789],
                [-57.56534, -25.25998],
                [-57.56423, -25.25456],
                [-57.56234, -25.25889],
                [-57.57123, -25.25823],
                [-57.57823, -25.26134],
                [-57.57567, -25.25234]
            ]
        }
    }]
}'::jsonb);

-- Línea 15: Paseo Costanera
INSERT INTO line_polylines (line_id, geojson) VALUES
(15, '{
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "properties": {"name": "Línea 15"},
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-57.57012, -25.26456],
                [-57.57123, -25.26345],
                [-57.57234, -25.26234],
                [-57.57089, -25.26378],
                [-57.56945, -25.26412],
                [-57.57012, -25.26845],
                [-57.57489, -25.26542],
                [-57.56823, -25.25789],
                [-57.56678, -25.25934],
                [-57.56712, -25.25876],
                [-57.56489, -25.25912],
                [-57.56534, -25.25998],
                [-57.56945, -25.26123]
            ]
        }
    }]
}'::jsonb);

-- Verify insertion
SELECT 'Polylines inserted successfully' AS status, COUNT(*) AS count FROM line_polylines;
