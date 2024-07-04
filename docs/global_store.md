
## Development

### Quick Start

https://developers.cloudflare.com/d1/get-started

#### Worker
```
npm install
cp wrangler.toml.example wrangler.toml
npm run dev
```

### Database

#### Create Database

```
# Run this command to create a new database
npx wrangler d1 create <DATABASE_NAME>

# You will get things like this:

[[d1_databases]]
binding = "DB" # i.e. available in your Worker on env.DB
database_name = "dify-global-store"
database_id = "xxxx-xxx-xxx-xxx-xxxx"

# Paste the things above to the wrangler.toml file
```

#### Use Raw SQL

:( Do not do this

```
npx wrangler d1 execute <DATABASE_NAME> --local --file=./db/migrations/1.sql
npx wrangler d1 execute <DATABASE_NAME> --local --command="SELECT * FROM Users"
```
#### Use D1 Migrations
:) Do this

For readable purpose, we use D1 Migrations to manage database migrations.

```
npx wrangler d1 migrations create <DATABASE_NAME> users
npx wrangler d1 migrations apply <DATABASE_NAME> --local
npx wrangler d1 migrations list <DATABASE_NAME> --local
```

## Deploy

```
npm run deploy
```
