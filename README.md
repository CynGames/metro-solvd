# Metro API #

## Overview ##

This API allows you to manage resources for a metro managing company, including employees, trains, schedules, stations,
tickets and maintenance.

## Setup ##

1. Run `docker-compose up`.
2. Open `http://localhost:3000` in your browser.

## Data Model ##

* `Employee`:
    * `id`(integer): A unique identifier for the employee.
    * `name`(string): The name of the employee.
    * `role`(string): The role or job title of the employee (e.g. “Train Operator”, “Station Attendant”).
    * `assigned_to`(integer): The train or station that the employee is assigned to work at.

* `Train`:
    * `id`(integer): A unique identifier for the train.
    * `line_id`(string): The line that the train runs on.
    * `type`(string): The type of elements the train will carry (e.g. 'Passenger', 'Cargo').
    * `capacity`(integer): The maximum number of elements the train can carry.
    * `schedule_id`(integer): The schedule that the train follows.

* `Line`:
    * `id`(integer): A unique identifier for the line.
    * `name`(string): The name of the line (e.g. “Solvd Line”).
    * `stations_id`(list of integers): A list of stations that the line stops at.
    * `color`(string): The color used to represent the line on maps.

* `Schedule`:
    * `id`(integer): A unique identifier for the schedule.
    * `train_id`(integer): The id of the train that follows this schedule.
    * `arrival`(list of objects: {station_id(integer), time(string)}): A list of the arrival times for each station on
      the line.
    * `departure`(list of objects: {station_id(integer), time(string)}): A list of the departure times for each station
      on the line.

* `Station`:
    * `id`(integer): A unique identifier for the station.
    * `name`(string): The name of the station (e.g. “Central Station”).
    * `location`(string): The address location of the station.

## Summary of the relationship between objects ##

- `Line` contains a list of `Stations` that it stops at.
- `Train` runs on a specific `Line` and follows a `Schedule`.
- `Schedule` specifies the times that a `Train` arrives at and departs from each `Station` on its `Line`.
- `Employee` can be assigned to work on a specific `Train` or at a specific `Station`.

## Endpoints API Documentation ##

### Employees ###

| Method | Endpoint       | Description                                   | Body                                                                                         | Response                                                                                                                                                          |
|--------|----------------|-----------------------------------------------|----------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| GET    | /employees     | Returns a list of all employees               | N/A                                                                                          | [{ id: 1, name: 'Mikhail Tamashuk', role: 'Train Operator', assigned_to: 2 }, { id: 2, name: 'Natallia Lihodievskaya', role: 'Train Operator', assigned_to: 12 }] |
| GET    | /employees/:id | Returns details about a specific employee     | N/A                                                                                          | { id: 1, name: 'Mikhail Tamashuk', role: 'Train Operator', assigned_to: 4 }                                                                                       |
| POST   | /employees     | Creates a new employee                        | { id: 1, name: 'Mikhail Tamashuk', role: 'Train Operator', assigned_to: 2, schedule_id: 20 } | { status: 'success', message:" Employee created successfully" }                                                                                                   |
| PUT    | /employees/:id | Updates an existing employee                  | { id: 1, name: 'Mikhail Tamashuk', role: 'Train Operator', assigned_to: 4 }                  | { status: 'success', message:" Employee updated successfully" }                                                                                                   |
| PATCH  | /employees/:id | Makes partial updates to an existing employee | { role: 'Station Attendant', assigned_to: 1 }                                                | { status: 'success', message:" Employee updated successfully" }                                                                                                   |
| DELETE | /employees/:id | Deletes an existing employee                  | N/A                                                                                          | { status: 'success', message:" Employee deleted successfully" }                                                                                                   |

### Trains ###

| Method | Endpoint    | Description                                | Body                                                                    | Response                                                                                                                                       |
|--------|-------------|--------------------------------------------|-------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| GET    | /trains     | Returns a list of all trains               | N/A                                                                     | [{ id: 1, line_id: 2, type: 'Passenger', capacity: 200, schedule_id: 2 }, { id: 1, line_id: 2, type: 'Cargo', capacity: 200, schedule_id: 3 }] |
| GET    | /trains/:id | Returns details about a specific train     | N/A                                                                     | { id: 1, line_id: 2, type: 'Cargo', capacity: 200, schedule_id: 2 }                                                                            |
| POST   | /trains     | Creates a new train                        | { id: 1, line_id: 2, type: 'Passenger', capacity: 200, schedule_id: 2 } | { status: 'success', message:" Train created successfully" }                                                                                   |
| PUT    | /trains/:id | Updates an existing train                  | { id: 1, line_id: 2, type: 'Cargo', capacity: 200, schedule_id: 2 }     | { status: 'success', message:" Train updated successfully" }                                                                                   |
| PATCH  | /trains/:id | Makes partial updates to an existing train | { capacity: 100 }                                                       | { status: 'success', message:" Train updated successfully" }                                                                                   |
| DELETE | /trains/:id | Deletes an existing train                  | N/A                                                                     | { status: 'success', message:" Train deleted successfully" }                                                                                   |

### Lines ###

| Method | Endpoint   | Description                               | Body                                                            | Response                                                                                                                           |
|--------|------------|-------------------------------------------|-----------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------|
| GET    | /lines     | Returns a list of all lines               | N/A                                                             | [{ id: 1, name: 'Red Line', stations_id: ['',''], color: 'Red' }, { id: 2, name: 'Red Line', stations_id: ['',''], color: 'Red' }] |
| GET    | /lines/:id | Returns details about a specific line     | N/A                                                             | { id: 1, name: 'Red Line', stations_id: ['',''], color: 'Red' }                                                                    |
| POST   | /lines     | Creates a new line                        | { id: 1, name: 'Red Line', stations_id: ['',''], color: 'Red' } | { status: 'success', message:" Line created successfully" }                                                                        |
| PUT    | /lines/:id | Updates an existing line                  | { id: 1, name: 'Red Line', stations_id: ['',''], color: 'Red' } | { status: 'success', message:" Line updated successfully" }                                                                        |
| PATCH  | /lines/:id | Makes partial updates to an existing line | { color: 'Red' }                                                | { status: 'success', message:" Line updated successfully" }                                                                        |
| DELETE | /lines/:id | Deletes an existing line                  | N/A                                                             | { status: 'success', message:" Line deleted successfully" }                                                                        |

### Schedules ###

| Method | Endpoint       | Description                                   | Body                                                                                                                                     | Response                                                                                                                                                                                                                                                                             |
|--------|----------------|-----------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| GET    | /schedules     | Returns a list of all schedules               | N/A                                                                                                                                      | [{ id: 1, train_id: 2, "arrival": {station_id: 1, time:"2023-03-14T13:00:00Z"}, "arrival": {station_id: 1, time:"2023-03-14T14:00:00Z"} }, { id: 2, train_id: 2, "arrival": {station_id: 1, time:"2023-03-14T13:00:00Z"}, "arrival": {station_id: 1, time:"2023-03-14T14:00:00Z"} }] |
| GET    | /schedules/:id | Returns details about a specific schedule     | N/A                                                                                                                                      | { id: 1, train_id: 2, "arrival": {station_id: 1, time:"2023-03-14T13:00:00Z"}, "arrival": {station_id: 1, time:"2023-03-14T14:00:00Z"} }                                                                                                                                             |
| POST   | /schedules     | Creates a new schedule                        | { id: 1, train_id: 2, "arrival": {station_id: 1, time:"2023-03-14T13:00:00Z"}, "arrival": {station_id: 1, time:"2023-03-14T14:00:00Z"} } | { status: 'success', message:" Schedule created successfully" }                                                                                                                                                                                                                      |
| PUT    | /schedules/:id | Updates an existing schedule                  | { id: 1, train_id: 2, "arrival": {station_id: 1, time:"2023-03-14T13:00:00Z"}, "arrival": {station_id: 1, time:"2023-03-14T14:00:00Z"} } | { status: 'success', message:" Schedule updated successfully" }                                                                                                                                                                                                                      |
| PATCH  | /schedules/:id | Makes partial updates to an existing schedule | { train_id: 4 }                                                                                                                          | { status: 'success', message:" Schedule updated successfully" }                                                                                                                                                                                                                      |
| DELETE | /schedules/:id | Deletes an existing schedule                  | N/A                                                                                                                                      | { status: 'success', message:" Schedule deleted successfully" }                                                                                                                                                                                                                      |

### Stations ###

| Method | Endpoint      | Description                                  | Body                                                  | Response                                                                                                    |
|--------|---------------|----------------------------------------------|-------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| GET    | /stations     | Returns a list of all stations               | N/A                                                   | [{ id: 1, name: 'Mike Station', location: 'Belarus' }, { id: 2, name: 'Solvd Station', location: 'China' }] |
| GET    | /stations/:id | Returns details about a specific station     | N/A                                                   | { id: 1, name: 'Mike Station', location: 'Belarus' }                                                        |
| POST   | /stations     | Creates a new station                        | { id: 1, name: 'Mike Station', location: 'Belarus' }  | { status: 'success', message:" Station created successfully" }                                              |
| PUT    | /stations/:id | Updates an existing station                  | { id: 1, name: 'Solvd Station', location: 'Belarus' } | { status: 'success', message:" Station updated successfully" }                                              |
| PATCH  | /stations/:id | Makes partial updates to an existing station | { name: 'Laba Station' }                              | { status: 'success', message:" Station updated successfully" }                                              |
| DELETE | /stations/:id | Deletes an existing station                  | N/A                                                   | { status: 'success', message:" Station deleted successfully" }                                              |


