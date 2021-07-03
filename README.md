# node-express-restful-api boilerplate
I use this repo for my node project
## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.
### Features
* User authorization with JWT token
* Uses different environment for production and development
* Provides a public folder for your public files (website, images etc)

### Installing

Make sure you have npm and then follow the below steps

## Steps

* Install mongo db in your pc and run it
* Install nodemon using **npm install -g nodemon**
* Clone this repo or make download the zip file
* Unzip to a new folder. Call it node-rest
* Inside node-rest run npm install
* Create a file called **.env** and insert the following code

```
NODE_ENV=development
```
### Running

To run the server do
```
nodemon index.js
```

You will see the following logs
```
λ nodemon index.js
[nodemon] 1.17.2
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node index.js`
info: mongodb://localhost/dev_dB
info: [APP] Starting server initialization
info: [SERVER] Initializing routes
info: [SERVER] Listening on port 4095
info: [APP] initialized SUCCESSFULLY
```

### Try it Out
**All Requests should be accompanied by the 'Content-Type : application/json' in the header**
* Create a new user
```
URL - http://localhost:4095/users
Method - POST
Authentication - None
Body- {
	"email":"test@gmail.com",
  	"password":"Password",
  	"name":"Test User"
}
```

* Sign in a user
```
URL - http://localhost:4095/api/sessions
Method - POST
Authentication - None
Body- {
	"email":"test@gmail.com",
  	"password":"Password"
}
```
* Get details for logger user using Authorization header
```
URL - http://localhost:4095/api/users
Method - GET
Authentication - YES //using the jwt token in the authorization header
Body- {}
```
* Get details for a user using ID. This is the 32 length user id
```
URL - http://localhost:4095/api/users/:id
Method - GET
Authentication - No
Body- {}
```
* Add details for a car
```
URL - http://localhost:4095/api/cars/
Method - POST
Authentication - No
Body- {
    "carLicenseNumber":"xxxxxxxxxxxx",
    "manufacturer":"honda",
    "model": "city",
    "basePrice": 100,
    "pph": 10.5
}
```
* Get details for a car
```
URL - http://localhost:4095/api/cars/:car_id
Method - GET
Authentication - No
Body- {}
```
* Update details for a car
```
URL - http://localhost:4095/api/cars/
Method - PUT
Authentication - No
Body- {
    "id": "car_id",
    "carLicenseNumber":"xxxxxxxxxxxx",
    "manufacturer":"honda",
    "model": "city",
    "basePrice": 100,
    "pph": 10.5
}
```
* Delete a car
```
URL - http://localhost:4095/api/cars/:car_id
Method - DELETE
Authentication - No
Body- {}
```
* Search available cars 
```
URL - http://localhost:4095/api/cars?startTime=''&endTime=''
Method - GET
Authentication - No
Body- {}
```
* Calculate price for a car for given duration
```
URL - http://localhost:4095/api/cars?carId=''&startTime=''&endTime=''
Method - GET
Authentication - No
Body- {}
```
* Get all bookings for a user
```
URL - http://localhost:4095/api/users/:user_id/bookings
Method - GET
Authentication - No
Body- {}
```
* Get all bookings for a car
```
URL - http://localhost:4095/api/cars/:car_id/bookings
Method - GET
Authentication - No
Body- {}
```
* Create a booking for a car for a duration
```
URL - http://localhost:4095/api/cars/book
Method - POST
Authentication - No
Body- {
    "carId": "60e01e9bbc9b561e06e96697",
    "userId": "1234",
    "startTime": "2020-05-03 00:00:00",
    "endTime": "2020-05-04 00:00:00"
}
```
### Extras
To run the server in production change the line in **.env**
```
NODE_ENV=production
```

#### Making changes in production/development
You can change the port number and db name in the two seperate files located inside config/environments
