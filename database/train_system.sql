-- To create the database open the terminal and type:
-- createdb train_system

-- Then, execute this sql file with the following command:
-- psql -d train_system -f train_system.sql

-- Connect to the database
\c train_system;

-- Create tables
CREATE TABLE IF NOT EXISTS Employee
(
    id       SERIAL PRIMARY KEY,
    name     VARCHAR(50) NOT NULL,
    job_role VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Train
(
    id           SERIAL PRIMARY KEY,
    name         VARCHAR(50) NOT NULL,
    capacity     INT         NOT NULL,
    employee_id  INT         REFERENCES Employee (id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS Line
(
    id    SERIAL PRIMARY KEY,
    name  VARCHAR(50) NOT NULL,
    color VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Station
(
    id           SERIAL PRIMARY KEY,
    name         VARCHAR(50)  NOT NULL,
    location     VARCHAR(100) NOT NULL,
    employee_id  INT          REFERENCES Employee (id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS Schedule
(
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(50) NOT NULL,
    arrival     JSONB       NOT NULL,
    departure   JSONB       NOT NULL,
    station_id  INT REFERENCES Station (id) ON DELETE CASCADE,
    line_id     INT REFERENCES Line (id) ON DELETE CASCADE,
    train_id    INT         REFERENCES Train (id) ON DELETE SET NULL
);

-- Create junction tables
CREATE TABLE IF NOT EXISTS Station_Line
(
    station_id INT REFERENCES Station (id) ON DELETE CASCADE,
    line_id    INT REFERENCES Line (id) ON DELETE CASCADE,
    PRIMARY KEY (station_id, line_id)
);

CREATE TABLE IF NOT EXISTS Train_Schedule
(
    train_id    INT REFERENCES Train (id) ON DELETE CASCADE,
    schedule_id INT REFERENCES Schedule (id) ON DELETE CASCADE,
    PRIMARY KEY (train_id, schedule_id)
);
