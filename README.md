# Objection: Graph Operations and Eager Loading

## Installation

```
cp .env.example .env

npm install

npm run migrate
```

## Run examples

In the scripts folder, there are some examples. You can run them by running:

```
npx tsx scripts/eager-load/me-to-grandfather.ts

npx tsx scripts/graph-insert/parent-grandparent.ts
```

Notice that the environment variable `DEBUG=knex:*` serves the purpose to log the queries, such as:

```
// eager loading person with pets //
  knex:client acquired connection from pool: __knexUid2 +1ms
  knex:query select `persons`.* from `persons` where `id` = ? trx3 +1ms
  knex:bindings [ 25 ] trx3 +1ms
  knex:client releasing connection to pool: __knexUid2 +0ms
  knex:client acquired connection from pool: __knexUid2 +0ms
  knex:query select `animals`.* from `animals` where `animals`.`ownerId` in (?) trx3 +0ms
  knex:bindings [ 25 ] trx3 +0ms
  knex:client releasing connection to pool: __knexUid2 +0ms
```

### Notes:

This repository makes use of Objection examples, especially the Models and the Initial Schema. That can be found at:

https://github.com/Vincit/objection.js/tree/main/examples


