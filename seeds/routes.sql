-- =============================================================================
-- Asunción Bus Routes
-- Line-stop relationships (which stops each line serves, in order)
-- Each line has 8-20 stops
-- Major hubs shared by 3-5 lines for transfers
-- =============================================================================

-- Línea 1: Estación Central → Zona Sur (N-S corridor)
INSERT INTO routes (line_id, stop_id, stop_order) VALUES
(1, 1, 1),   -- Estación Central
(1, 4, 2),   -- Plaza de los Héroes
(1, 6, 3),   -- Palacio de los López
(1, 3, 4),   -- Mercado Cuatro
(1, 26, 5),  -- Barrio Obrero Plaza
(1, 27, 6),  -- Barrio Obrero Norte
(1, 29, 7),  -- Obrero Comercial
(1, 97, 8),  -- Intermodal Sur
(1, 28, 9),  -- Barrio Obrero Sur
(1, 86, 10), -- Zona Industrial Norte
(1, 89, 11), -- Zona Industrial Oeste
(1, 88, 12), -- Zona Industrial Este
(1, 16, 13); -- Barrio Lido Central

-- Línea 2: Terminal de Ómnibus → Barrio Obrero (N-S corridor)
INSERT INTO routes (line_id, stop_id, stop_order) VALUES
(2, 5, 1),   -- Terminal de Ómnibus
(2, 1, 2),   -- Estación Central
(2, 4, 3),   -- Plaza de los Héroes
(2, 2, 4),   -- Plaza España
(2, 3, 5),   -- Mercado Cuatro
(2, 51, 6),  -- Bernardino Caballero Plaza
(2, 26, 7),  -- Barrio Obrero Plaza
(2, 28, 8),  -- Barrio Obrero Sur
(2, 98, 9),  -- Intermodal Este
(2, 86, 10), -- Zona Industrial Norte
(2, 88, 11), -- Zona Industrial Este
(2, 90, 12); -- Puerta de la Tierra

-- Línea 3: Plaza España → Villa Morra (N-S corridor)
INSERT INTO routes (line_id, stop_id, stop_order) VALUES
(3, 2, 1),   -- Plaza España
(3, 4, 2),   -- Plaza de los Héroes
(3, 8, 3),   -- Plaza de la Independencia
(3, 6, 4),   -- Palacio de los López
(3, 9, 5),   -- Casa de la Independencia
(3, 17, 6),  -- Shopping Lido
(3, 31, 7),  -- Villa Morra Plaza
(3, 32, 8),  -- Shopping Villa Morra
(3, 34, 9),  -- Villa Morra Sur
(3, 35, 10), -- Residencial Villa Morra
(3, 37, 11), -- Ycua Satí Norte
(3, 36, 12), -- Ycua Satí Centro
(3, 51, 13); -- Bernardino Caballero Plaza

-- Línea 4: Mercado Cuatro → Santísima Trinidad (N-S corridor)
INSERT INTO routes (line_id, stop_id, stop_order) VALUES
(4, 3, 1),   -- Mercado Cuatro
(4, 1, 2),   -- Estación Central
(4, 4, 3),   -- Plaza de los Héroes
(4, 2, 4),   -- Plaza España
(4, 36, 5),  -- Ycua Satí Centro
(4, 37, 6),  -- Ycua Satí Norte
(4, 17, 7),  -- Shopping Lido
(4, 52, 8),  -- Bernardino Caballero Norte
(4, 54, 9),  -- Calle Bernardino
(4, 57, 10), -- Mariscal López Norte
(4, 58, 11), -- Mariscal López Sur
(4, 60, 12), -- Mariscal López Oeste
(4, 41, 13); -- Santísima Trinidad Iglesia

-- Línea 5: San Vicente → República (N-S corridor)
INSERT INTO routes (line_id, stop_id, stop_order) VALUES
(5, 11, 1),  -- San Vicente Plaza
(5, 12, 2),  -- Colegio San Vicente
(5, 14, 3),  -- Barrio San Vicente Norte
(5, 1, 4),   -- Estación Central
(5, 4, 5),   -- Plaza de los Héroes
(5, 8, 6),   -- Plaza de la Independencia
(5, 61, 7),  -- Plaza República
(5, 62, 8),  -- República Norte
(5, 64, 9),  -- República Este
(5, 65, 10), -- República Oeste
(5, 77, 11), -- Eusebio Ayala Norte
(5, 76, 12); -- Eusebio Ayala Calle

-- Línea 6: Costanera → Ycua Satí (E-W corridor)
INSERT INTO routes (line_id, stop_id, stop_order) VALUES
(6, 91, 1),  -- Costanera Norte
(6, 92, 2),  -- Costanera Central
(6, 93, 3),  -- Costanera Sur
(6, 95, 4),  -- Costanera Este
(6, 5, 5),   -- Terminal de Ómnibus
(6, 1, 6),   -- Estación Central
(6, 4, 7),   -- Plaza de los Héroes
(6, 10, 8),  -- Panteón Nacional
(6, 36, 9),  -- Ycua Satí Centro
(6, 37, 10), -- Ycua Satí Norte
(6, 38, 11), -- Ycua Satí Sur
(6, 40, 12); -- Ycua Satí Oeste

-- Línea 7: Zona Caaguazú → Mariscal López (E-W corridor)
INSERT INTO routes (line_id, stop_id, stop_order) VALUES
(7, 21, 1),  -- Caaguazú Norte
(7, 22, 2),  -- Caaguazú Centro
(7, 23, 3),  -- Caaguazú Sur
(7, 24, 4),  -- Plaza Caaguazú
(7, 11, 5),  -- San Vicente Plaza
(7, 1, 6),   -- Estación Central
(7, 2, 7),   -- Plaza España
(7, 57, 8),  -- Mariscal López Norte
(7, 56, 9),  -- Mariscal López Avenida
(7, 58, 10), -- Mariscal López Sur
(7, 60, 11), -- Mariscal López Oeste
(7, 61, 12), -- Plaza República
(7, 76, 13); -- Eusebio Ayala Calle

-- Línea 8: Barrio Lido → Pettirossi (E-W corridor)
INSERT INTO routes (line_id, stop_id, stop_order) VALUES
(8, 16, 1),  -- Barrio Lido Central
(8, 18, 2),  -- Calle Lido Principal
(8, 20, 3),  -- Lido Comercial
(8, 36, 4),  -- Ycua Satí Centro
(8, 2, 5),   -- Plaza España
(8, 4, 6),   -- Plaza de los Héroes
(8, 8, 7),   -- Plaza de la Independencia
(8, 66, 8),  -- Pettirossi Calle
(8, 67, 9),  -- Pettirossi Norte
(8, 68, 10), -- Pettirossi Sur
(8, 70, 11), -- Pettirossi Oeste
(8, 100, 12);-- Centro Comercial

-- Línea 9: Próceres → Herrera (E-W corridor)
INSERT INTO routes (line_id, stop_id, stop_order) VALUES
(9, 81, 1),  -- Próceres Plaza
(9, 82, 2),  -- Próceres Norte
(9, 84, 3),  -- Próceres Este
(9, 85, 4),  -- Próceres Oeste
(9, 56, 5),  -- Mariscal López Avenida
(9, 4, 6),   -- Plaza de los Héroes
(9, 2, 7),   -- Plaza España
(9, 36, 8),  -- Ycua Satí Centro
(9, 17, 9),  -- Shopping Lido
(9, 71, 10), -- Herrera Avenida
(9, 72, 11), -- Herrera Norte
(9, 74, 12), -- Herrera Este
(9, 75, 13); -- Herrera Oeste

-- Línea 10: General Díaz → Eusebio Ayala (E-W corridor)
INSERT INTO routes (line_id, stop_id, stop_order) VALUES
(10, 46, 1), -- General Díaz Avenida
(10, 47, 2), -- General Díaz Norte
(10, 49, 3), -- General Díaz Este
(10, 50, 4), -- General Díaz Oeste
(10, 61, 5), -- Plaza República
(10, 4, 6),  -- Plaza de los Héroes
(10, 8, 7),  -- Plaza de la Independencia
(10, 76, 8), -- Eusebio Ayala Calle
(10, 77, 9), -- Eusebio Ayala Norte
(10, 78, 10),-- Eusebio Ayala Sur
(10, 79, 11),-- Eusebio Ayala Este
(10, 80, 12),-- Eusebio Ayala Oeste
(10, 31, 13);-- Villa Morra Plaza

-- Línea 11: Circular Centro (Circular route)
INSERT INTO routes (line_id, stop_id, stop_order) VALUES
(11, 1, 1),  -- Estación Central
(11, 4, 2),  -- Plaza de los Héroes
(11, 8, 3),  -- Plaza de la Independencia
(11, 9, 4),  -- Casa de la Independencia
(11, 6, 5),  -- Palacio de los López
(11, 2, 6),  -- Plaza España
(11, 3, 7),  -- Mercado Cuatro
(11, 5, 8),  -- Terminal de Ómnibus
(11, 10, 9), -- Panteón Nacional
(11, 7, 10), -- Catedral Metropolitana
(11, 31, 11),-- Villa Morra Plaza
(11, 17, 12),-- Shopping Lido
(11, 36, 13),-- Ycua Satí Centro
(11, 37, 14);-- Ycua Satí Norte

-- Línea 12: Bernardino Caballero Loop (Secondary route)
INSERT INTO routes (line_id, stop_id, stop_order) VALUES
(12, 51, 1), -- Bernardino Caballero Plaza
(12, 52, 2), -- Bernardino Caballero Norte
(12, 53, 3), -- Bernardino Caballero Sur
(12, 54, 4), -- Calle Bernardino
(12, 55, 5), -- Bernardino Comercial
(12, 26, 6), -- Barrio Obrero Plaza
(12, 27, 7), -- Barrio Obrero Norte
(12, 28, 8), -- Barrio Obrero Sur
(12, 29, 9), -- Obrero Comercial
(12, 3, 10), -- Mercado Cuatro
(12, 2, 11), -- Plaza España
(12, 4, 12), -- Plaza de los Héroes
(12, 1, 13); -- Estación Central

-- Línea 13: Zona Industrial Express (Secondary route)
INSERT INTO routes (line_id, stop_id, stop_order) VALUES
(13, 86, 1), -- Zona Industrial Norte
(13, 87, 2), -- Zona Industrial Sur
(13, 88, 3), -- Zona Industrial Este
(13, 89, 4), -- Zona Industrial Oeste
(13, 90, 5), -- Puerta de la Tierra
(13, 26, 6), -- Barrio Obrero Plaza
(13, 3, 7),  -- Mercado Cuatro
(13, 1, 8),  -- Estación Central
(13, 4, 9),  -- Plaza de los Héroes
(13, 5, 10), -- Terminal de Ómnibus
(13, 91, 11),-- Costanera Norte
(13, 92, 12);-- Costanera Central

-- Línea 14: Intermodal Connection (Secondary route)
INSERT INTO routes (line_id, stop_id, stop_order) VALUES
(14, 96, 1), -- Intermodal Norte
(14, 97, 2), -- Intermodal Sur
(14, 98, 3), -- Intermodal Este
(14, 99, 4), -- Intermodal Oeste
(14, 1, 5),  -- Estación Central
(14, 2, 6),  -- Plaza España
(14, 4, 7),  -- Plaza de los Héroes
(14, 8, 8),  -- Plaza de la Independencia
(14, 31, 9), -- Villa Morra Plaza
(14, 36, 10),-- Ycua Satí Centro
(14, 16, 11),-- Barrio Lido Central
(14, 11, 12),-- San Vicente Plaza
(14, 61, 13);-- Plaza República

-- Línea 15: Paseo Costanera (Secondary route)
INSERT INTO routes (line_id, stop_id, stop_order) VALUES
(15, 91, 1), -- Costanera Norte
(15, 92, 2), -- Costanera Central
(15, 93, 3), -- Costanera Sur
(15, 94, 4), -- Paseo Costanera
(15, 95, 5), -- Costanera Este
(15, 5, 6),  -- Terminal de Ómnibus
(15, 1, 7),  -- Estación Central
(15, 4, 8),  -- Plaza de los Héroes
(15, 6, 9),  -- Palacio de los López
(15, 7, 10), -- Catedral Metropolitana
(15, 9, 11), -- Casa de la Independencia
(15, 8, 12), -- Plaza de la Independencia
(15, 10, 13);-- Panteón Nacional

-- Verify insertion
SELECT 'Routes inserted successfully' AS status, COUNT(*) AS count FROM routes;
