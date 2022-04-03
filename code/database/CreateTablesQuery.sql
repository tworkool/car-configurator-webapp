USE CarConfiguratorDB;

CREATE TABLE Motorleistung(
	id				INT NOT NULL PRIMARY KEY,
	attribut		INT NOT NULL,
	name			VARCHAR(255) NOT NULL,
	beschreibung	VARCHAR(255),
	preis			DECIMAL NOT NULL
);

CREATE TABLE Lackierung(
	id				INT NOT NULL PRIMARY KEY,
	attribut		VARCHAR(255) NOT NULL,
	name			VARCHAR(255) NOT NULL,
	beschreibung	VARCHAR(255),
	preis			DECIMAL NOT NULL
);

CREATE TABLE Felgen(
	id				INT NOT NULL PRIMARY KEY,
	name			VARCHAR(255) NOT NULL,
	beschreibung	VARCHAR(255),
	preis			DECIMAL NOT NULL
);

CREATE TABLE Sonderausstattung(
	id				INT NOT NULL PRIMARY KEY,
	name			VARCHAR(255) NOT NULL,
	beschreibung	VARCHAR(255),
	preis			DECIMAL NOT NULL
);

CREATE TABLE Kraftfahrzeuge(
	id				INT NOT NULL PRIMARY KEY,
	name			VARCHAR(255) NOT NULL,
	klasse			VARCHAR(255) NOT NULL,
	hersteller		VARCHAR(255) NOT NULL,
	grundpreis		DECIMAL NOT NULL
);

CREATE TABLE KFZKonfiguration(
	id					INT NOT NULL PRIMARY KEY,
	kfz_id				INT FOREIGN KEY REFERENCES Kraftfahrzeuge(id),
	motorleistung_id	INT FOREIGN KEY REFERENCES Motorleistung(id),
	felgen_id			INT FOREIGN KEY REFERENCES Felgen(id),
	lackierung_id		INT FOREIGN KEY REFERENCES Lackierung(id)
);

CREATE TABLE Bestellungen(
	id					INT NOT NULL PRIMARY KEY,
	kfzkonfiguration_id	INT FOREIGN KEY REFERENCES KFZKonfiguration(id),
	kundenname			VARCHAR(255) NOT NULL,
	bestellnummer		INT NOT NULL,
	bestelluhrzeit		DATETIME,
	bestellsumme		DECIMAL NOT NULL
);

CREATE TABLE Ausstattungstypen(
	id				INT NOT NULL PRIMARY KEY,
	name			VARCHAR(255) NOT NULL,
	beschreibung	VARCHAR(255) NOT NULL,
	attributsname	VARCHAR(255)
);
INSERT INTO Ausstattungstypen (id, name, beschreibung, attributsname)
VALUES 
	(1, 'Motorleistung', 'Leistung des verbauten Motors', 'Leistung (PS)'),
	(2, 'Lackierung', 'Auﬂenlackierung (Prim‰rfarbe glanz) des Fahrzeugs', 'Farbcode'),
	(3, 'Felgen', 'Felgen des Fahrzeugs', NULL);