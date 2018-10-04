# base-api
A starting point for a production ready Node.js + Express API using PostgreSQL as the database. It includes user authentication, password and email reset, Redis caching (soon), and a Docker config for easy local development.

## Description
This project handles the basic essentials of a typical API.
* Authentication (passport & jwt)
* A base User model with handlers for password/email reset
* Database (PostgreSQL)
* Optional caching using Redis
* Clustering using the node cluster module with automatic worker restart
* A convenient query middleware builder based on Sequelize
* Testing (mocha)
* linting with ESLint

## Requirements
* node > v8.9.4
* Docker

## Installation
```bash
git clone https://github.com/aryamohades/Koach.git
```

## Features
* [Express](https://github.com/expressjs/express)
* ...

## Usage
* `yarn run start` Build and run the app in one command using docker-compose
* `yarn run docker-build` Build the app using docker-compose
* `yarn run docker-up` Run the app using docker-compose
* `yarn run lint` Lint the app
* `yarn run clean` Reinstall packages
* `yarn run test` Run mocha tests

## Documentation
Coming soon

## Contributors
[Arya Mohades](https://github.com/aryamohades)

## License
MIT.
