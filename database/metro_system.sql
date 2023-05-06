-- To create the database run the following:
CREATE DATABASE metro_system
    WITH
    OWNER = solvd_user
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

COMMENT ON DATABASE metro_system
    IS 'For Solvd LABA.';

-- \c metro_system solvd_user

-- Create tables
CREATE TABLE IF NOT EXISTS employee
(
    id       SERIAL PRIMARY KEY,
    name     VARCHAR(50) NOT NULL,
    job_role VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS train
(
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(50) NOT NULL,
    capacity    INT         NOT NULL,
    employee_id INT         REFERENCES employee (id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS line
(
    id    SERIAL PRIMARY KEY,
    name  VARCHAR(50) NOT NULL,
    color VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS station
(
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(50)  NOT NULL,
    location    VARCHAR(100) NOT NULL,
    employee_id INT          REFERENCES employee (id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS schedule
(
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(50) NOT NULL,
    arrival    JSONB       NOT NULL,
    departure  JSONB       NOT NULL,
    station_id INT REFERENCES station (id) ON DELETE CASCADE,
    line_id    INT REFERENCES line (id) ON DELETE CASCADE,
    train_id   INT         REFERENCES train (id) ON DELETE SET NULL
);

-- Create junction tables
CREATE TABLE IF NOT EXISTS station_line
(
    station_id INT REFERENCES station (id) ON DELETE CASCADE,
    line_id    INT REFERENCES line (id) ON DELETE CASCADE,
    PRIMARY KEY (station_id, line_id)
);

CREATE TABLE IF NOT EXISTS train_schedule
(
    train_id    INT REFERENCES train (id) ON DELETE CASCADE,
    schedule_id INT REFERENCES schedule (id) ON DELETE CASCADE,
    PRIMARY KEY (train_id, schedule_id)
);

CREATE TABLE IF NOT EXISTS time_periods
(
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(255) NOT NULL,
    start_time TIME         NOT NULL,
    end_time   TIME         NOT NULL
);

INSERT INTO time_periods (name, start_time, end_time)
VALUES ('morning', '06:00:00', '10:00:00'),
       ('lunch', '12:00:00', '14:00:00'),
       ('evening', '16:00:00', '20:00:00');

