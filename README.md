This project is hosted on [ugentsailing.be](https://ugentsailing.be)

# Development

Follow these instructions for setting up a development environment.

## Tools

1. Install [asdf](https://asdf-vm.com/).
2. Add the required asdf plugins: `sh .asdf-plugins`.
3. Use these plugins to install the dependencies: `asdf install`.
4. Run `asdf reshim`.
5. Add `$HOME/.asdf/shims` to your `$PATH`.

## Auth

To run the code, first you need to fill out create the necessary environment variables. Start with making a copy of the `example.env.local` file and renaming it to `.env.local`.

Let's start easy, first create the auth_secret. Next-auth has a cli tool for this:

```bash
pnpx auth secret --copy
```

Paste this value as `AUTH_SECRET`.

If you want to host this on your own website, edit `AUTH_URL`. If you run in dev mode, this is set to <http://localhost:3000> and should work in this tutorial.

## Setting up postgres

### Using docker

If you've docker installed you can use the docker dev compose to spin up a basic postgres db with the following command:

`docker compose up`

### Postgres on your system

If you haven't set up postgres yet, you can use the [tutorial](https://www.geeksforgeeks.org/postgresql/install-postgresql-on-windows/) from geeksforgeeks.

Next create a table for this project:

```psql
CREATE USER ugs_site WITH PASSWORD '*****';
CREATE DATABASE ugs_site WITH OWNER = ugs_site;
GRANT ALL PRIVILEGES ON DATABASE ugs_site TO ugs_site;
```

For development purposes, prisma allows to test migrations on a shadow database, configure a shadow database as well:

```psql
CREATE USER ugs_site WITH PASSWORD '*****';
CREATE DATABASE ugs_site WITH OWNER = ugs_site;
GRANT ALL PRIVILEGES ON DATABASE ugs_site TO ugs_site;
```

Now you can configure the `DATABASE_URL` and the `SHADOW_DATABASE_URL`.

## Setting up discord and github

Currently we have github and discord providers configured. Go to [the discord developers portal](https://discord.com/developers/) and create a new app. Fill in the name and press create.
Now choose oauth2 and copy the client ID, this is the `AUTH_DISCORD_ID`.

Reset the client secret and copy it to `AUTH_DISCORD_SECRET`.
Add the following url to the redirects: `http://localhost:3000/api/auth/callback/discord`.

Now the discord login should work.

A very simular process is done for github. Let's surf to [the github developers settings](https://github.com/settings/developers). Create a new oauth app. Choose a name, use `http://localhost:3000` as Homepage URL, and set `http://localhost:3000/api/auth/callback/discord` as Authorization callback URL.

Copy the client ID to `AUTH_GITHUB_ID` and create a new secret and copy it as `AUTH_GITHUB_SECRET`.

## Finishing up

First time running you will need to install all packages.
Run the following:

```bash
pnpm install
```

Next run the migrations and setup the database:

```bash
pnpm run db:migrate
```

Now you are ready to run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Contribute

Found an error, want to edit some code, improve this project. Please open an issue, or fork and submit a pull request.

## Backend

The backend is writting in zenstack. To create a new table and expose the API, simply edit `models/schema.zmodel`.

To create migrations for the database, you can use `pnpm run db:makemigrations`, you can find the newly created migration file in `models/prisma/migrations/`. Check the migrations and if you are happy, run `pnpm run db:migrate` which will apply the migrations.

After running all that, your newly created model will be availble under /api/model/rest/&lt;model-name&gt;.

Zenstack automatically prevents users from reading, updating, creating an deleting entries. In order to allow users to update/create entries, add the following code:

```zmodel
@@allow("create,update,delete", auth().roles?[role.name == "role-name"])
@@allow("read", true)
```

The most important roles are found here:

|         id          |          name           | Role on site                   |
|---------------------| :---------------------: | -----------------------------: |
| 1424125799056806051 | Captain                 | Admin, can edit everything     |
| 1362493283464380487 | Member                  | User                           |
| 1422578278811828264 | MATES                   | Team member, can create events |
| 1422579667914854440 | CREW                    | Team member, can create events |
| 1432120129415549162 | Sponsors                | Partner, has own admin page    |

The full list of currently available roles can be found at `models/prisma/migrations/20251027002933_roles/migration.sql`.

The full Zenstack Documentation can be found [here](https://zenstack.dev/docs/the-complete-guide).

# Learn More

## Next.js

Next-js is used for the frontend rendering. Next-js also hosts the api, which is generated from the zenstack model.

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Zenstack

Zenstack is used to handle all database and backend related setup.

The Zenstack schema is used to create the necessary tables in the database. Zenstack limits crud operations to users which are allowed to perform the operation. Zenstack also allows to generate routes for all models.

- [Zenstack Documentation](https://zenstack.dev/docs/the-complete-guide)

## Auth.js

Nextauth is a flexible framework which implements authentication of users. It allows to handle multiple login systems simultaniously and provides interfaces to react and prisma (zenstack is built on top of prisma).

- [Auth.js Documentation](https://next-auth.js.org/getting-started/introduction)
