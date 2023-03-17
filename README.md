# Metro API #

## Table of Contents ##

- [Overview](#overview)
- [Setup](#setup)
- [Endpoints API Documentation](#endpoints-api-documentation)
  - [Employees Overview (api/employees)](#employees-overview-apiemployees)
    - [GET api/employees](#get-apiemployees)
    - [GET api/employees/id](#get-apiemployeesid)
    - [POST api/employees](#post-apiemployees)
    - [PUT api/employees](#put-apiemployees)
    - [DELETE api/employees](#delete-apiemployees)
  - [Trains Overview (api/trains)](#trains-overview-apitrains)
    - [GET api/trains](#get-apitrains)
    - [GET api/trains/id](#get-apitrainsid)
    - [POST api/trains](#post-apitrains)
    - [PUT api/trains](#put-apitrains)
    - [DELETE api/trains](#delete-apitrains)
  - [Stations Overview (api/stations)](#stations-overview-apistations)
    - [GET api/stations](#get-apistations)
    - [GET api/stations/id](#get-apistationsid)
    - [POST api/stations](#post-apistations)
    - [PUT api/stations](#put-apistationsid)
    - [DELETE api/stations](#delete-apistationsid)
  - [Lines Overview (api/lines)](#lines-overview-apilines)
    - [GET api/lines](#get-apilines)
    - [GET api/lines/id](#get-apilinesid)
    - [POST api/lines](#post-apilines)
    - [PUT api/lines](#put-apilinesid)
    - [DELETE api/lines](#delete-apilinesid)
  - [Schedules Overview (api/schedules)](#schedules-overview-apischedules)
    - [GET api/schedules](#get-apischedules)
    - [GET api/schedules/id](#get-apischedulesid)
    - [POST api/schedules](#post-apischedules)
    - [PUT api/schedules](#put-apischedulesid)
    - [DELETE api/schedules](#delete-apischedulesid)

## Overview ##

This API allows you to manage resources for a metro managing company, including employees, trains, schedules and
stations.

## Setup ##

1. Install [Docker](https://www.docker.com/products/docker-desktop).
2. Clone this repository.
3. Run `docker-compose up`.
4. Open `http://localhost:3000` in your browser.

## Summary of the relationship between objects ##

- `Line` contains a list of `Stations` that it stops at.
- `Train` runs on a specific `Line` and follows a `Schedule`.
- `Schedule` specifies the times that a `Train` arrives at and departs from each `Station` on its `Line`.
- `Employee` can be assigned to work on a specific `Train` or at a specific `Station`.

# Endpoints API Documentation #

## Employees Overview `(api/employees)` ##

| Method | Endpoint       | Description                               | Successful Response Code | Error Response Code               |
|--------|----------------|-------------------------------------------|--------------------------|-----------------------------------|
| GET    | /employees     | Returns a list of all employees           | 200                      | 404                               |
| GET    | /employees/:id | Returns details about a specific employee | 200                      | 400 if incorrect params. Else 404 |
| POST   | /employees     | Creates a new employee                    | 201                      | 400 if incorrect params. Else 404 |
| PUT    | /employees/:id | Updates an existing employee              | 201                      | 400 if incorrect params. Else 404 |
| DELETE | /employees/:id | Deletes an existing employee              | 200                      | 200                               |

## Detailed Employee Endpoints ##

### GET api/employees ###

**Request**

> `api/employees`

**Response Body**
> ```
> [{ 
>   id: 1, 
>   name: 'Mikhail Tamashuk', 
>   role: 'Train Operator', 
>   assigned_to: 2 
> }, 
> { 
>   id: 2, 
>   name: 'Natallia Lihodievskaya', 
>   role: 'Train Operator', 
>   assigned_to: 12 
> },
> { 
>   id: 3, 
>   name: 'Tomas Leguizamon', 
>   role: 'Station Attendant', 
>   assigned_to: 12 
> }]
> ```

#### Query Parameters ####

| Parameter   | Type    | Description                                                                         |
|-------------|---------|-------------------------------------------------------------------------------------|
| name        | string  | The name of the employee or part of it.                                             |
| role        | string  | The role or job title of the employee (e.g. “Train Operator”, “Station Attendant”). |
| assigned_to | integer | The train or station that the employee is assigned to work at.                      |

**Request**

> `api/employees?role=operator`

**Response Body**
> ```
> [{ 
>   id: 1, 
>   name: 'Mikhail Tamashuk', 
>   role: 'Train Operator', 
>   assigned_to: 2 
> }, 
> { 
>   id: 2, 
>   name: 'Natallia Lihodievskaya', 
>   role: 'Train Operator', 
>   assigned_to: 12 
> }]
> ```

### GET api/employees/id ###

**Request**
> `api/employees/1`

**Response Body**
> ```
> {
>   id: 1,
>   name: 'Mikhail Tamashuk',
>   role: 'Train Operator',
>   assigned_to: 2
> }
> ```

#### Query Parameters ####

| Parameter | Type   | Description                             |
|-----------|--------|-----------------------------------------|
| name      | string | The name of the employee or part of it. |

**Request**

> `api/employees?name=Mikhail`

**Response Body**
> ```
> { 
>   id: 1, 
>   name: 'Mikhail Tamashuk', 
>   role: 'Train Operator', 
>   assigned_to: 2 
> }
> ```

### POST api/employees ###

**Request**
> `api/employees`

> ```
> {
>   name: 'Cesar Moros',
>   role: 'Train Operator',
>   assigned_to: 3,
>   schedule_id: 20
> }
> ```

**Response Body**
> ```
> {
>   status: 'success',
>   message:" Employee created successfully"
> }
> ```

### PUT api/employees ###

**Request**
> `api/employees/4`

> ```
> {
>   name: 'Cesar Moros',
>   role: 'Train Operator',
>   assigned_to: 3,
>   schedule_id: 22
> }
> ```

**Response Body**
> ```
> {
>   status: 'success',
>   message:" Employee updated successfully"
> }
> ```

### DELETE api/employees ###

**Request**
> `api/employees/4`

**Response Body**
> ```
> {
>   status: 'success',
>   message:" Employee deleted successfully"
> }
> ```

### Trains Overview `(api/trains)` ###

| Method | Endpoint    | Description                            | Successful Response Code | Error Response Code               |
|--------|-------------|----------------------------------------|--------------------------|-----------------------------------|
| GET    | /trains     | Returns a list of all trains           | 200                      | 404                               |
| GET    | /trains/:id | Returns details about a specific train | 200                      | 400 if incorrect params. Else 404 |
| POST   | /trains     | Creates a new train                    | 201                      | 400 if incorrect params. Else 404 |
| PUT    | /trains/:id | Updates an existing train              | 201                      | 400 if incorrect params. Else 404 |
| DELETE | /trains/:id | Deletes an existing train              | 200                      | 200                               |

## Detailed Train Endpoints ##

### GET api/trains ###

**Request**

> `api/trains`

**Response Body**
> ```
> [{ 
>   id: 1, 
>   line_id: 2, 
>   type: 'Passenger', 
>   capacity: 200, 
>   schedule_id: 2 
> }, 
> { 
>   id: 2, 
>   line_id: 2, 
>   type: 'Cargo', 
>   capacity: 200, 
>   schedule_id: 3 
> }]
> ```

#### Query Parameters ####

| Parameter   | Type    | Description                                                            |
|-------------|---------|------------------------------------------------------------------------|
| line_id     | integer | The line that the train runs on.                                       |
| type        | string  | The type of elements the train will carry (e.g. 'Passenger', 'Cargo'). |
| capacity    | integer | The maximum number of elements the train can carry.                    |
| schedule_id | integer | The schedule that the train follows.                                   |

**Request**

> `api/trains?line_id=2&type=Passenger`

**Response Body**
> ```
> [{
>   id: 1,
>   line_id: 2,
>   type: 'Passenger',
>   capacity: 200,
>   schedule_id: 2
> }]
> ```

### GET api/trains/id ###

**Request**

> `api/trains/1`

**Response Body**
> ```
> {
>   id: 1,
>   line_id: 2,
>   type: 'Passenger',
>   capacity: 200,
>   schedule_id: 2
> }
> ```

### POST api/trains ###

**Request**

> `api/trains`

> ```
> {
>   line_id: 3,
>   type: 'Passenger',
>   capacity: 500,
>   schedule_id: 22
> }
> ```

**Response Body**
> ```
> {
>   status: 'success',
>   message:" Train created successfully"
> }
> ```

### PUT api/trains ###

**Request**

> `api/trains/1`

> ```
> {
>   line_id: 2,
>   type: 'Cargo',
>   capacity: 200,
>   schedule_id: 2
> }
> ```

**Response Body**
> ```
> {
>   status: 'success',
>   message:" Train updated successfully"
> }
> ```

### DELETE api/trains ###

**Request**

> `api/trains/4`

**Response Body**
> ```
> {
>   status: 'success',
>   message:" Train deleted successfully"
> }
> ```

### Lines Overview `(api/lines)` ###

| Method | Endpoint   | Description                           | Successful Response Code | Error Response Code               |
|--------|------------|---------------------------------------|--------------------------|-----------------------------------|
| GET    | /lines     | Returns a list of all lines           | 200                      | 404                               |                               
| GET    | /lines/:id | Returns details about a specific line | 200                      | 400 if incorrect params. Else 404 |
| POST   | /lines     | Creates a new line                    | 201                      | 400 if incorrect params. Else 404 |
| PUT    | /lines/:id | Updates an existing line              | 201                      | 400 if incorrect params. Else 404 |
| DELETE | /lines/:id | Deletes an existing line              | 200                      | 200                               |

## Detailed Line Endpoints ##

### GET api/lines ###

**Request**

> `api/lines`

**Response Body**
> ```
> [{
>   id: 1,
>   name: 'Ginza Line',
>   stations_id: [1,2],
>   color: 'Grey'
> },
> {
>   id: 2,
>   name: 'Shibuya Line',
>   stations_id: [2,3],
>   color: 'Blue'
> }]
> ```
>

#### Lines Query Parameters ####

| Parameter   | Type             | Description                                   |
|-------------|------------------|-----------------------------------------------|
| name        | string           | The name of the line.                         |
| stations_id | list of integers | A list of stations that the line stops at.    |
| color       | string           | The color used to represent the line on maps. |

**Request**

> `api/lines?color=Blue`

**Response Body**
> ```
> [{
>   id: 2,
>   name: 'Shibuya Line',
>   stations_id: [2,3],
>   color: 'Blue'
> }]
> ```

### GET api/lines/id ###

**Request**

> `api/lines/2`

**Response Body**

> ```
> {
>   id: 2,
>   name: 'Shibuya Line',
>   stations_id: [2,3],
>   color: 'Blue'
> }
> ```

### POST api/lines ###

**Request**

> `api/lines`

> ```
> {
>   id: 3,
>   name: 'Unity Line',
>   stations_id: [4,5],
>   color: 'White'
> }
> ```

**Response Body**

> ```
> {
>   status: 'success',
>   message:" Line created successfully"
> }
> ```

### PUT api/lines/id ###

**Request**

> `api/lines/2`

> ```
> {
>   id: 2,
>   name: 'Shibuya Line',
>   stations_id: [1,3],
>   color: 'Blue'
> }
> ```

**Response Body**

> ```
> {
>   status: 'success',
>   message:" Line updated successfully"
> }
> ```

### DELETE api/lines/id ###

**Request**

> `api/lines/1`

**Response Body**

> ```
> {
>   status: 'success',
>   message:" Line deleted successfully"
> }
> ```

### Schedules Overview `(api/schedules)` ###

| Method | Endpoint       | Description                               | Successful Response Code | Error Response Code               |
|--------|----------------|-------------------------------------------|--------------------------|-----------------------------------|
| GET    | /schedules     | Returns a list of all schedules           | 200                      | 404                               |
| GET    | /schedules/:id | Returns details about a specific schedule | 200                      | 400 if incorrect params. Else 404 |
| POST   | /schedules     | Creates a new schedule                    | 201                      | 400 if incorrect params. Else 404 |
| PUT    | /schedules/:id | Updates an existing schedule              | 201                      | 400 if incorrect params. Else 404 |
| DELETE | /schedules/:id | Deletes an existing schedule              | 200                      | 200                               |

## Detailed Schedule Endpoints ##

### GET api/schedules ###

**Request**
> `api/schedules`

**Response Body**
> ```
> [{
>   id: 1,
>   train_id: 2,
>   "arrival": {station_id: 1, time:"2023-03-14T13:00:00Z"},
>   "departure": {station_id: 1, time:"2023-03-14T14:00:00Z"}
> },
> {
>   id: 2,
>   train_id: 2,
>   "arrival": {station_id: 1, time:"2023-03-14T13:00:00Z"},
>   "departure": {station_id: 1, time:"2023-03-14T14:00:00Z"}
> },
> {
> ...
> }]
> ```

#### Query Parameters ####

| Parameter | Type                                                 | Description                                                 |
|-----------|------------------------------------------------------|-------------------------------------------------------------|
| train_id  | integer                                              | The train that follows this schedule.                       |
| arrival   | list of objects: {station_id(integer), time(string)} | A list of the arrival times for each station on the line.   |
| departure | list of objects: {station_id(integer), time(string)} | A list of the departure times for each station on the line. |

**Request**

> `api/schedules?train_id=2`

**Response Body**

> ```
> [{
>   id: 1,
>   train_id: 2,
>   "arrival": {station_id: 1, time:"2023-03-14T13:00:00Z"},
>   "departure": {station_id: 1, time:"2023-03-14T14:00:00Z"}
> },
> {
>   id: 2,
>   train_id: 2,
>   "arrival": {station_id: 1, time:"2023-03-14T13:00:00Z"},
>   "departure": {station_id: 1, time:"2023-03-14T14:00:00Z"}
> }]
> ```

### GET api/schedules/id ###

**Request**

> `api/schedules/1`

**Response Body**

> ```
> {
>   id: 1,
>   train_id: 2,
>   "arrival": {station_id: 1, time:"2023-03-14T13:00:00Z"},
>   "departure": {station_id: 1, time:"2023-03-14T14:00:00Z"}
> }
> ```

### POST api/schedules ###

**Request**

> `api/schedules`

> ```
> {
>   id: 1,
>   train_id: 2,
>   "arrival": {station_id: 1, time:"2023-03-14T13:00:00Z"},
>   "departure": {station_id: 1, time:"2023-03-14T14:00:00Z"}
> }
> ```

**Response Body**

> ```
> {
>   status: 'success',
>   message:" Schedule created successfully"
> }
> ```

### PUT api/schedules/id ###

**Request**

> `api/schedules/1`

> ```
> {
>   id: 1,
>   train_id: 2,
>   "arrival": {station_id: 1, time:"2023-03-14T13:00:00Z"},
>   "departure": {station_id: 1, time:"2023-03-14T14:00:00Z"}
> }
> ```

**Response Body**

> ```
> {
>   status: 'success',
>   message:" Schedule updated successfully"
> }
> ```

### DELETE api/schedules/id ###

**Request**

> `api/schedules/1`

**Response Body**

> ```
> {
>   status: 'success',
>   message:" Schedule deleted successfully"
> }
> ```

### Stations Overview `(api/stations)` ###

| Method | Endpoint      | Description                              | Successful Response Code | Error Response Code               |
|--------|---------------|------------------------------------------|--------------------------|-----------------------------------|
| GET    | /stations     | Returns a list of all stations           | 200                      | 404                               |
| GET    | /stations/:id | Returns details about a specific station | 200                      | 400 if incorrect params. Else 404 |
| POST   | /stations     | Creates a new station                    | 201                      | 400 if incorrect params. Else 404 |
| PUT    | /stations/:id | Updates an existing station              | 201                      | 400 if incorrect params. Else 404 |
| DELETE | /stations/:id | Deletes an existing station              | 200                      | 200                               |

## Detailed Station Endpoints ##

### GET api/stations ###

**Request**
> `api/stations`

**Response Body**
> ```
> [{
>   id: 1,
>   name: 'Mike Station',
>   location: 'Belarus'
> },
> {
>   id: 2,
>   name: 'Solvd Station',
>   location: 'China'
> },
> {
> ...
> }]
> ```

#### Query Parameters ####

| Parameter | Type   | Description                          |
|-----------|--------|--------------------------------------|
| name      | string | The name of the station.             |
| location  | string | The address location of the station. |

**Request**
> `api/stations?name=Mike`

**Response Body**
> ```
> [{
>   id: 1,
>   name: 'Mike Station',
>   location: 'Belarus'
> }]
> ```

### GET api/stations/id ###

**Request**

> `api/stations/1`

**Response Body**

> ```
> {
>   id: 1,
>   name: 'Mike Station',
>   location: 'Belarus'
> }
> ```

### POST api/stations ###

**Request**

> `api/stations`

> ```
> {
>   id: 1,
>   name: 'Mike Station',
>   location: 'Belarus'
> }
> ```

**Response Body**

> ```
> {
>   status: 'success',
>   message:" Station created successfully"
> }
> ```

### PUT api/stations/id ###

**Request**

> `api/stations/1`

> ```
> {
>   id: 1,
>   name: 'Solvd Station',
>   location: 'Belarus'
> }
> ```

**Response Body**

> ```
> {
>   status: 'success',
>   message:" Station updated successfully"
> }
> ```

### DELETE api/stations/id ###

**Request**

> `api/stations/1`

**Response Body**

> ```
> {
>   status: 'success',
>   message:" Station deleted successfully"
> }
> ```