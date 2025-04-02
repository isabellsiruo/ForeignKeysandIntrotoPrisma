# Puppy Bowl API (Prisma + Express)

This project recreates the Puppy Bowl API using Prisma ORM and Express.js. It is a fully functioning CRUD (Create, Read, Update, Delete) API connected to a PostgreSQL database.

## Summary

-forked and cloned a starter repo from GitHub
-created a new PostgreSQL database called puppy_bowl_db
-installed and configured Prisma for PostgreSQL
-defined a Prisma schema with a Player model and a Status enum (field/bench)
-created and seeded 10 players using prisma/seed.js
-wrote all API routes in api/players.js to:
  -get all players
  -get one player by ID
  -create a new player
  -update a player's status
  -delete a player
-set up server.js to load the API and handle routes and errors
-tested all routes using Postman, including:
  -GET, POST, PUT, DELETE requests
  -adding and updating player data
  -viewing results live on http://localhost:3000/api/players
-added custom error handling that returns a clean error message if something goes wrong

## Technologies used

-Node.js
-Express.js
-Prisma ORM
-PostgreSQL
-Nodemon (development)
-Postman (testing)

# Find directions below

This activity guides you through building a simple CRUD API using Prisma and Express. It requires a basic understanding of relational database schemas, how to translate them into the equivalent [Prisma schemas](https://www.prisma.io/docs/concepts/components/prisma-schema), and how to [perform CRUD operations with Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client/crud).

## Overview

1. Define Prisma schema according to the provided database schema.
1. Write a seed script to initialize the database with Prisma Migrate.
1. Write Express routes that perform CRUD operations via Prisma Client.

## Database Schema

<img src="database_schema.svg" alt="schema" width="250"/>

## Instructions

### Initialize the Database

1. Fork and clone this repo. Work in your local repository!
1. Create a new Postgres database `puppy_bowl_db`
1. Install the Prisma CLI.\
   `npm install prisma --save-dev`
1. Initialize Prisma to use postgresql.\
   `npx prisma init --datasource-provider postgresql`
1. In the generated `.env` file, set `DATABASE_URL` to `"postgresql://USER:PASSWORD@localhost:5432/puppy_bowl_db"`
   - USER is the name of your database user, e.g. janedoe
   - PASSWORD is the password for your database user

1. Add models to your `schema.prisma` file according to the database schema above.
   - Remember in the original Puppy Bowl API that status is an `enum` of either **field** or **bench**
   - Look at this [Prisma docs model](https://www.prisma.io/docs/orm/prisma-schema/data-model/models) for an example of `enum`
1. Create and run the initial migration.\
   `npx prisma migrate dev --name init`
1. Explore the created database. You should see an empty `Player` model:\
   `npx prisma studio`
1. If you made a mistake in your `schema.prisma`, instead of running another migration, you can instead use [`db push`](https://www.prisma.io/docs/guides/migrate/prototyping-schema-db-push) to sync your database with the schema. This is useful while _prototyping_.\
   `npx prisma db push`

### Seed the Database

1. Install Prisma Client, which we will use to interact with the database.\
   `npm install @prisma/client`
1. Create and export a new `PrismaClient` in `prisma/index.js`.
   ```js
   const { PrismaClient } = require("@prisma/client");
   const prisma = new PrismaClient();
   module.exports = prisma;
   ```
1. In `prisma/seed.js`, seed 10 players into the database. Refer to [the docs on how to create multiple records](https://www.prisma.io/docs/orm/prisma-client/queries/crud#create-multiple-records).
   ```js
   const prisma = require("../prisma");
   const seed = async () => {
     // TODO: Create 10 players
   };
   seed()
     .then(async () => await prisma.$disconnect())
     .catch(async (e) => {
       console.error(e);
       await prisma.$disconnect();
       process.exit(1);
     });
   ```
1. Update `package.json` to configure Prisma's integrated seeding functionality.
   ```json
   "prisma": {
     "seed": "node prisma/seed.js"
   }
   ```
1. Use Prisma Migrate to completely reset and seed the database.\
   `npx prisma migrate reset`
   - Note: this is designed to be used in _development_ only! Another option is `npx prisma db seed`, but that will not clear existing data. `reset` is simpler to use (for now).
1. Confirm that the database is correctly seeded.\
   `npx prisma studio`

### Serve the Data with Express

1. Install Express and create a server.
   - `npm install express morgan`
   - `npm install -D nodemon`
   - Create a `server.js` file for the express server and add middleware
   - Add a script to your `package.json` file that starts your application:
   ```json
   "scripts": {
      "start:dev": "nodemon server.js"
   }
   ```
1. Create the following `/players` routes. These routes should use the [Prisma Client CRUD operations](https://www.prisma.io/docs/concepts/components/prisma-client/crud) to read and write from the database.
   - `GET /api/players` - returns an array of all players
   - `POST /api/players` - creates a new player with the information provided in the request body
   - `GET /api/players/:id` - returns a single player with the specified id
   - `PUT /api/players/:id` - overwrites the player status to **field** or **bench** with the information provided in the request body
   - `DELETE /api/players/:id` - deletes the player with the specified id

You now have a fully working CRUD API!
