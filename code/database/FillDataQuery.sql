USE CarConfiguratorDB;

INSERT INTO Motorleistung
VALUES 
	(99, 280, 'V8', 'V8 Sportmotor', 2500.99), 
	(100, 350, 'V12', 'V12 Sportmotor', 6999), 
	(101, 350, 'V8s', 'V8 Sportmotor mit Turbo oder so', 4000), 
	(102, 450, 'V8 AMG', 'V8 Sportmotor von AMG', 4000),
	(103, 290, 'E-Motor', 'Elektronischer Motor', 10000.5);


INSERT INTO Felgen
VALUES
	(1, 'Damina Performance DM08', 'Sportfelgen vom Hersteller Damina Performance', 1299),
	(2,	'Borbet LX18',	'Felgen vom Hersteller Borbet',	790),
	(3,	'R3 R3H03',	'Felgen vom Hersteller R3',	700),
	(4,	'MAM Rs4',	'Felgen vom Hersteller MAM',	900),
	(5,	'ATS Streetrallye',	'Sportfelgen vom Hersteller ATS',	1199);


INSERT INTO Lackierung
VALUES
	(1, '#000', 'Schwarz', 'Schwarz Glanz', 500),
	(2, '#fff', 'Weiﬂ', 'Weiﬂ Glanz', 500),
	(3, '#1e81b0', 'Eastern Blue', 'Eastern Blue Glanz', 500),
	(4, '#1e81b0', 'Roof Terracotta', 'Roof Terracotta Glanz', 500),
	(5, '#1e81b0', 'Lima', 'Lima Glanz', 500);


INSERT INTO Kraftfahrzeuge
VALUES
	(1, 'Porsche 911', 'Sportwagen', 'Porsche', 99000),
	(2, 'Volkswagen Tuareg', 'Kombi', 'Volkswagen', 35000);