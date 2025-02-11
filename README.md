### GraphQL Backend

This is a very basic GraphQL backend that can be used to test certain GraphQL API patterns before we implement them in our Massdriver Org

Note: This project does not have hot-reload. You have to manually reload to server to reflect any changes

What it includes:

- [Apollo Server](https://www.apollographql.com/docs/apollo-server) to run the graphQL server
- [Express](https://expressjs.com/) middleware
- [graphql-ws](https://www.npmjs.com/package/graphql-ws/v/5.6.0) for subscriptions
- [PostgreSQL](https://www.postgresql.org/) for a database
- [Prisma](https://www.prisma.io/docs/getting-started) for an ORM

## Setup

Follow these steps to run the server locally:

1. Clone the repo

2. Run this to install dependencies

```
yarn install
```

3. Run this to start the PostgreSQL image:

```
yarn start-db
```

4. Run this to seed the database:

```
yarn seed
```

5. Finally, run this to start the server:

```
yarn dev
```

Everything should now be set up properly and running!
