# Metro API #

## Table of Contents ##

- [Overview](#overview)
- [Setup](#setup)
- [Summary](#summary-of-the-relationship-between-objects)
- [Authentication](./documentation/AUTH-README.md#authentication)
    - [Register](./documentation/AUTH-README.md#register)
    - [Login](./documentation/AUTH-README.md#login)
- [Relationships](./documentation/RELATIONSHIP-README.md#data-modeling)
  - [Entity Relationship Diagram](./documentation/RELATIONSHIP-README.md#entity-relationship-diagram)
  - [Detailed Table Information](./documentation/RELATIONSHIP-README.md#detailed-table-information)
    - [Employee](./documentation/RELATIONSHIP-README.md#employee)
    - [Trains](./documentation/RELATIONSHIP-README.md#trains)
    - [Lines](./documentation/RELATIONSHIP-README.md#lines)
    - [Stations](./documentation/RELATIONSHIP-README.md#stations)
    - [Schedule](./documentation/RELATIONSHIP-README.md#schedule)
    - [Junction Tables](./documentation/RELATIONSHIP-README.md#junction-tables)
      - [Stations_Line](./documentation/RELATIONSHIP-README.md#stationsline)
      - [Trains_Schedule](./documentation/RELATIONSHIP-README.md#trainsschedule)
    - [Relationships Explained](./documentation/RELATIONSHIP-README.md#relationships-explained)
- [Endpoints API Documentation](./documentation/ENDPOINTS-README.md#endpoints-api-documentation)
  - [Employees Overview (api/employees)](./documentation/ENDPOINTS-README.md#employees-overview-apiemployees)
    - [GET api/employees](./documentation/ENDPOINTS-README.md#get-apiemployees)
    - [GET api/employees/id](./documentation/ENDPOINTS-README.md#get-apiemployeesid)
    - [POST api/employees](./documentation/ENDPOINTS-README.md#post-apiemployees)
    - [PUT api/employees](./documentation/ENDPOINTS-README.md#put-apiemployees)
    - [DELETE api/employees](./documentation/ENDPOINTS-README.md#delete-apiemployees)
  - [Trains Overview (api/trains)](./documentation/ENDPOINTS-README.md#trains-overview-apitrains)
    - [GET api/trains](./documentation/ENDPOINTS-README.md#get-apitrains)
    - [GET api/trains/id](./documentation/ENDPOINTS-README.md#get-apitrainsid)
    - [POST api/trains](./documentation/ENDPOINTS-README.md#post-apitrains)
    - [PUT api/trains](./documentation/ENDPOINTS-README.md#put-apitrains)
    - [DELETE api/trains](./documentation/ENDPOINTS-README.md#delete-apitrains)
  - [Stations Overview (api/stations)](./documentation/ENDPOINTS-README.md#stations-overview-apistations)
    - [GET api/stations](./documentation/ENDPOINTS-README.md#get-apistations)
    - [GET api/stations/id](./documentation/ENDPOINTS-README.md#get-apistationsid)
    - [POST api/stations](./documentation/ENDPOINTS-README.md#post-apistations)
    - [PUT api/stations](./documentation/ENDPOINTS-README.md#put-apistationsid)
    - [DELETE api/stations](./documentation/ENDPOINTS-README.md#delete-apistationsid)
  - [Lines Overview (api/lines)](./documentation/ENDPOINTS-README.md#lines-overview-apilines)
    - [GET api/lines](./documentation/ENDPOINTS-README.md#get-apilines)
    - [GET api/lines/id](./documentation/ENDPOINTS-README.md#get-apilinesid)
    - [POST api/lines](./documentation/ENDPOINTS-README.md#post-apilines)
    - [PUT api/lines](./documentation/ENDPOINTS-README.md#put-apilinesid)
    - [DELETE api/lines](./documentation/ENDPOINTS-README.md#delete-apilinesid)
  - [Schedules Overview (api/schedules)](./documentation/ENDPOINTS-README.md#schedules-overview-apischedules)
    - [GET api/schedules](./documentation/ENDPOINTS-README.md#get-apischedules)
    - [GET api/schedules/id](./documentation/ENDPOINTS-README.md#get-apischedulesid)
    - [POST api/schedules](./documentation/ENDPOINTS-README.md#post-apischedules)
    - [PUT api/schedules](./documentation/ENDPOINTS-README.md#put-apischedulesid)
    - [DELETE api/schedules](./documentation/ENDPOINTS-README.md#delete-apischedulesid)

## Overview

This API is part of the LABA internship from Solvd. 

It allows you to manage resources for a metro managing company, including employees, trains, schedules and
stations.

## Setup

1. Install [Docker](https://www.docker.com/products/docker-desktop).
2. Clone this repository.
3. Run `docker-compose up`.
4. Open `http://localhost:3000` in your browser.

## Summary of the relationship between objects

- `Line` contains a list of `Stations` that it stops at.
- `Train` runs on a specific `Line` and follows a `Schedule`. 
- `Schedule` specifies the times that a `Train` arrives at and departs from each `Station` on its `Line`.
- `Employee` can be assigned to work on a specific `Train` or at a specific `Station`.
  
The relationships are as follows:

Station -> Line (many-to-many)

Train -> Line (one-to-many)
Line -> Train (many-to-one)

Train -> Schedule (one-to-one)
Schedule -> Train (one-to-one)
Schedule -> Station (one-to-many)
Station -> Schedule (many-to-one)
Employee -> Station (one-to-one)
Station -> Employee (one-to-one)
Employee -> Train (one-to-one)
Train -> Employee (one-to-one)

TODO: 
Do tests
Do doc
Check db 
