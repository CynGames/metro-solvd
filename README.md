# Metro API #

## Overview ##
This API allows you to manage resources for a metro managing company, including employees, trains, schedules, stations, tickets, routes and maintenance.

## Setup ##

Step 1: Run `docker-compose up`.
Step 2: Open `http://localhost:3000` in your browser.

## Endpoints API Documentation ##

### Employees ###
| Method | Endpoint | Description                               |
| ------ | -------- |-------------------------------------------|
| GET | /employees | Returns a list of all employees           |
| GET | /employees/:id | Returns details about a specific employee |
| POST | /employees | Creates a new employee                    |
| PUT | /employees/:id | Updates an existing employee              |
| PATCH | /employees/:id | Makes partial updates to an existing employee |
| DELETE | /employees/:id | Deletes an existing employee              |

### Trains ###
| Method | Endpoint | Description |
| ------ | -------- |------------------------------------------------|
| GET | /trains | Returns a list of all trains |
| GET | /trains/:id | Returns details about a specific train |
| POST | /trains | Creates a new train |
| PUT | /trains/:id | Updates an existing train |
| PATCH | /trains/:id | Makes partial updates to an existing train |
| DELETE | /trains/:id | Deletes an existing train |

### Schedules ###
| Method | Endpoint | Description |
| ------ | -------- |------------------------------------------------|
| GET | /schedules | Returns a list of all schedules |
| GET | /schedules/:id | Returns details about a specific schedule |
| POST | /schedules | Creates a new schedule |
| PUT | /schedules/:id | Updates an existing schedule |
| PATCH | /schedules/:id | Makes partial updates to an existing schedule |
| DELETE | /schedules/:id | Deletes an existing schedule |

### Stations ###
| Method | Endpoint | Description |
| ------ | -------- |------------------------------------------------|
| GET | /stations | Returns a list of all stations |
| GET | /stations/:id | Returns details about a specific station |
| POST | /stations | Creates a new station |
| PUT | /stations/:id | Updates an existing station |
| PATCH | /stations/:id | Makes partial updates to an existing station |
| DELETE | /stations/:id | Deletes an existing station |


### Tickets ###
| Method | Endpoint | Description |
| ------ | -------- |------------------------------------------------|
| GET | /tickets | Returns a list of all tickets |
| GET | /tickets/:id | Returns details about a specific ticket |
| POST | /tickets | Creates a new ticket |
| PUT | /tickets/:id | Updates an existing ticket |
| PATCH | /tickets/:id | Makes partial updates to an existing ticket |
| DELETE | /tickets/:id | Deletes an existing ticket |
 
### Maintenance ###
| Method | Endpoint | Description |
| ------ | -------- |------------------------------------------------|
| GET | /maintenance | Returns a list of all maintenance |
| GET | /maintenance/:id | Returns details about a specific maintenance |
| POST | /maintenance | Creates a new maintenance |
| PUT | /maintenance/:id | Updates an existing maintenance |
| PATCH | /maintenance/:id | Makes partial updates to an existing maintenance |
| DELETE | /maintenance/:id | Deletes an existing maintenance |