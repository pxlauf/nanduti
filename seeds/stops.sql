-- =============================================================================
-- Asunción Bus Stops
-- ~120 stops with realistic Asunción neighborhood names and coordinates
-- Coordinates within: lat -25.2637° to -25.2500°, lon -57.5800° to -57.5500°
-- =============================================================================

INSERT INTO stops (name, latitude, longitude) VALUES
-- Major Transit Hubs (shared by multiple lines)
('Estación Central', -25.26542, -57.57489),
('Plaza España', -25.26015, -57.56234),
('Mercado Cuatro', -25.26312, -57.55891),
('Plaza de los Héroes', -25.25789, -57.56823),
('Terminal de Ómnibus', -25.26845, -57.57012),

-- Centro Histórico
('Palacio de los López', -25.25934, -57.56678),
('Catedral Metropolitana', -25.25876, -57.56712),
('Plaza de la Independencia', -25.25998, -57.56534),
('Casa de la Independencia', -25.25912, -57.56489),
('Panteón Nacional', -25.26123, -57.56945),

-- San Vicente
('San Vicente Plaza', -25.26134, -57.57823),
('Colegio San Vicente', -25.26245, -57.57912),
('Iglesia San Vicente', -25.26089, -57.57745),
('Barrio San Vicente Norte', -25.26345, -57.57856),
('Barrio San Vicente Sur', -25.25967, -57.57689),

-- Barrio Lido
('Barrio Lido Central', -25.25823, -57.57123),
('Shopping Lido', -25.25745, -57.57234),
('Calle Lido Principal', -25.25867, -57.57045),
('Residencial Lido', -25.25934, -57.57312),
('Lido Comercial', -25.25712, -57.57089),

-- Zona Caaguazú
('Caaguazú Norte', -25.25678, -57.57567),
('Caaguazú Centro', -25.25545, -57.57689),
('Caaguazú Sur', -25.25423, -57.57812),
('Plaza Caaguazú', -25.25589, -57.57734),
('Mercado Caaguazú', -25.25634, -57.57456),

-- Barrio Obrero
('Barrio Obrero Plaza', -25.26234, -57.56012),
('Barrio Obrero Norte', -25.26356, -57.55934),
('Barrio Obrero Sur', -25.26112, -57.55867),
('Obrero Comercial', -25.26278, -57.56145),
('Barrio Obrero Este', -25.26189, -57.55989),

-- Villa Morra
('Villa Morra Plaza', -25.25456, -57.56423),
('Shopping Villa Morra', -25.25389, -57.56512),
('Villa Morra Norte', -25.25534, -57.56345),
('Villa Morra Sur', -25.25345, -57.56567),
('Residencial Villa Morra', -25.25412, -57.56689),

-- Ycua Satí
('Ycua Satí Centro', -25.25889, -57.56234),
('Ycua Satí Norte', -25.25967, -57.56123),
('Ycua Satí Sur', -25.25812, -57.56345),
('Ycua Satí Este', -25.25934, -57.56089),
('Ycua Satí Oeste', -25.25845, -57.56389),

-- Santísima Trinidad
('Santísima Trinidad Iglesia', -25.25345, -57.56823),
('Santísima Trinidad Norte', -25.25467, -57.56712),
('Santísima Trinidad Sur', -25.25278, -57.56934),
('Plaza Trinidad', -25.25389, -57.56867),
('Trinidad Comercial', -25.25312, -57.56989),

-- General Díaz
('General Díaz Avenida', -25.25512, -57.57123),
('General Díaz Norte', -25.25634, -57.57034),
('General Díaz Sur', -25.25456, -57.57212),
('General Díaz Este', -25.25589, -57.56989),
('General Díaz Oeste', -25.25478, -57.57189),

-- Bernardino Caballero
('Bernardino Caballero Plaza', -25.26034, -57.55823),
('Bernardino Caballero Norte', -25.26145, -57.55734),
('Bernardino Caballero Sur', -25.25956, -57.55889),
('Calle Bernardino', -25.26067, -57.55712),
('Bernardino Comercial', -25.25989, -57.55934),

-- Mariscal López
('Mariscal López Avenida', -25.25678, -57.56234),
('Mariscal López Norte', -25.25789, -57.56145),
('Mariscal López Sur', -25.25589, -57.56312),
('Mariscal López Este', -25.25689, -57.56089),
('Mariscal López Oeste', -25.25712, -57.56345),

-- República
('Plaza República', -25.25234, -57.57567),
('República Norte', -25.25345, -57.57478),
('República Sur', -25.25156, -57.57634),
('República Este', -25.25289, -57.57423),
('República Oeste', -25.25312, -57.57689),

-- Pettirossi
('Pettirossi Calle', -25.25723, -57.55934),
('Pettirossi Norte', -25.25834, -57.55845),
('Pettirossi Sur', -25.25645, -57.55989),
('Pettirossi Este', -25.25789, -57.55789),
('Pettirossi Oeste', -25.25812, -57.56012),

-- Herrera
('Herrera Avenida', -25.25456, -57.55734),
('Herrera Norte', -25.25567, -57.55645),
('Herrera Sur', -25.25378, -57.55789),
('Herrera Este', -25.25489, -57.55589),
('Herrera Oeste', -25.25512, -57.55812),

-- Eusebio Ayala
('Eusebio Ayala Calle', -25.25534, -57.56678),
('Eusebio Ayala Norte', -25.25645, -57.56589),
('Eusebio Ayala Sur', -25.25456, -57.56734),
('Eusebio Ayala Este', -25.25589, -57.56489),
('Eusebio Ayala Oeste', -25.25612, -57.56789),

-- Próceres
('Próceres Plaza', -25.25134, -57.57123),
('Próceres Norte', -25.25245, -57.57034),
('Próceres Sur', -25.25056, -57.57189),
('Próceres Este', -25.25189, -57.56934),
('Próceres Oeste', -25.25212, -57.57212),

-- Zona Industrial
('Zona Industrial Norte', -25.26123, -57.55789),
('Zona Industrial Sur', -25.25934, -57.55678),
('Zona Industrial Este', -25.26234, -57.55612),
('Zona Industrial Oeste', -25.26045, -57.55823),
('Puerta de la Tierra', -25.26078, -57.55712),

-- Costanera
('Costanera Norte', -25.26456, -57.57012),
('Costanera Central', -25.26345, -57.57123),
('Costanera Sur', -25.26234, -57.57234),
('Paseo Costanera', -25.26378, -57.57089),
('Costanera Este', -25.26412, -57.56945),

-- Additional stops for route connectivity
('Intermodal Norte', -25.26512, -57.56678),
('Intermodal Sur', -25.25834, -57.56012),
('Intermodal Este', -25.25789, -57.57123),
('Intermodal Oeste', -25.26245, -57.56345),
('Centro Comercial', -25.26023, -57.56512),
('Hospital Central', -25.26156, -57.56734),
('Universidad Nacional', -25.25745, -57.56389),
('Parque Carlos Antonio López', -25.25934, -57.56623);

-- Verify insertion
SELECT 'Stops inserted successfully' AS status, COUNT(*) AS count FROM stops;
