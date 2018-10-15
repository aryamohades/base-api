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
* An enjoyable local development experience with loading data into database from json and auto docker container restart when your files change
* Testing (mocha)
* linting with ESLint

## Requirements
* node > v8.9.4
* Docker

## Installation
```bash
git clone https://github.com/aryamohades/base-api.git
```

## Features
* [Express](https://github.com/expressjs/express)
* [Redis](https://redis.io)
* [PostgreSQL](https://www.postgresql.org)
* [Sequelize](https://github.com/sequelize/sequelize)
* [Passport](https://github.com/jaredhanson/passport)
* [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
* [sequelize-fixtures](https://github.com/domasx2/sequelize-fixtures)
* [ESLint](https://github.com/eslint/eslint)
* [cors](https://github.com/expressjs/cors)
* [Helmet](https://github.com/helmetjs/helmet)
* [Nodemon](https://github.com/remy/nodemon)
* [Docker](https://www.docker.com)

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
