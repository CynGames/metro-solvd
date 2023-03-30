-- Since there's seems to be no easy way to execute a conditional SQL statement for PostgreSQL,
-- the only workaround is psql meta-command
SELECT 'CREATE DATABASE train_system'
WHERE NOT EXISTS(SELECT FROM pg_database WHERE datname = 'train_system')

-- Connect to the database
\c train_system;

-- Create tables
CREATE TABLE IF NOT EXISTS Employee
(
    id       SERIAL PRIMARY KEY,
    name     VARCHAR(50) NOT NULL,
    job_role VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Trains
(
    id           SERIAL PRIMARY KEY,
    name         VARCHAR(50) NOT NULL,
    capacity     INT         NOT NULL,
    employees_id INT         REFERENCES Employee (id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS Lines
(
    id    SERIAL PRIMARY KEY,
    name  VARCHAR(50) NOT NULL,
    color VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Stations
(
    id           SERIAL PRIMARY KEY,
    name         VARCHAR(50)  NOT NULL,
    location     VARCHAR(100) NOT NULL,
    employees_id INT          REFERENCES Employee (id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS Schedule
(
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(50) NOT NULL,
    arrival     JSONB       NOT NULL,
    departure   JSONB       NOT NULL,
    stations_id INT REFERENCES Stations (id) ON DELETE CASCADE,
    lines_id    INT REFERENCES Lines (id) ON DELETE CASCADE,
    trains_id   INT         REFERENCES Trains (id) ON DELETE SET NULL
);

-- Create junction tables
CREATE TABLE IF NOT EXISTS Stations_Line
(
    station_id INT REFERENCES Stations (id) ON DELETE CASCADE,
    line_id    INT REFERENCES Lines (id) ON DELETE CASCADE,
    PRIMARY KEY (station_id, line_id)
);

CREATE TABLE IF NOT EXISTS Trains_Schedule
(
    train_id    INT REFERENCES Trains (id) ON DELETE CASCADE,
    schedule_id INT REFERENCES Schedule (id) ON DELETE CASCADE,
    PRIMARY KEY (train_id, schedule_id)
);