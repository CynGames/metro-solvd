# Authentication

## Table of Contents 

- [Authentication Process](#authentication-process)
  - [Register](#register)
  - [Login](#login)

    
## Authentication Process

### Register

The API uses JWT authentication. The steps for authentication are the following:

Send a POST request to `/api/auth/register` with a body with the name and the password properties.

Example:
```

{
    "name": "Tomas",
    "password": "Test12345"
}

```

Example of response:
```
Registration Successful
```

### Login

Send a POST request to `/api/auth/login` with a body with the name and the password properties.

Example:
```

{
    "name": "Tomas",
    "password": "Test12345"
}

```

Example of response:
```
> {
>   "message": "Login Successful",
>   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVG9tYXMiLCJwYXNzd29yZCI6IlRlc3QxMjMifQ.W5-8IUmeh0a7WfnXA2hBhxRiWah5eKUppo3bRSWazfU"
> }
```

The token is the JWT token that you will use for authentication.

Send a GET request to `/api/homework` with the token in the Authorization header to confirm that the authentication works.

Example of response:
```
What is the interval between trains at one time or another, if 6 cars and each accommodates 50 people, and the flow of people in the morning is 1000 people, at lunch 500, and in the evening 5000
```
