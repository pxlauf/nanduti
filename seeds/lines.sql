-- =============================================================================
-- Asunción Bus Lines
-- 15 bus lines with descriptions and colors
-- Línea 1-5: North-South corridors
-- Línea 6-10: East-West corridors
-- Línea 11-15: Secondary/circular routes
-- =============================================================================

INSERT INTO lines (name, description, color) VALUES
-- North-South Corridors (Línea 1-5)
('Línea 1', 'Estación Central → Zona Sur', '#E74C3C'),
('Línea 2', 'Terminal de Ómnibus → Barrio Obrero', '#3498DB'),
('Línea 3', 'Plaza España → Villa Morra', '#2ECC71'),
('Línea 4', 'Mercado Cuatro → Santísima Trinidad', '#9B59B6'),
('Línea 5', 'San Vicente → República', '#F39C12'),

-- East-West Corridors (Línea 6-10)
('Línea 6', 'Costanera → Ycua Satí', '#1ABC9C'),
('Línea 7', 'Zona Caaguazú → Mariscal López', '#E67E22'),
('Línea 8', 'Barrio Lido → Pettirossi', '#34495E'),
('Línea 9', 'Próceres → Herrera', '#16A085'),
('Línea 10', 'General Díaz → Eusebio Ayala', '#8E44AD'),

-- Secondary/Circular Routes (Línea 11-15)
('Línea 11', 'Circular Centro', '#C0392B'),
('Línea 12', 'Bernardino Caballero Loop', '#2980B9'),
('Línea 13', 'Zona Industrial Express', '#27AE60'),
('Línea 14', 'Intermodal Connection', '#D35400'),
('Línea 15', 'Paseo Costanera', '#7F8C8D');

-- Verify insertion
SELECT 'Lines inserted successfully' AS status, COUNT(*) AS count FROM lines;
