This project is hosted on [ugentsailing.be](https://ugentsailing.be)

## Development

To run the code, first you need to fill out create the necessary environment variables. Start with making a copy of the `example.env.local` file and renaming it to `.env.local`.

Let's start easy, first create the auth_secret. Next-auth has a cli tool for this:
```bash
npx auth secret --copy
```

Paste this value as `AUTH_SECRET`.

If you want to host this on your own website, edit `AUTH_URL`. If you run in dev mode, this is set to http://localhost:3000 and should work in this tutorial.

### Setting up postgres

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

### Setting up discord and github

Currently we have github and discord providers configured. Go to [the discord developers portal](https://discord.com/developers/) and create a new app. Fill in the name and press create.
Now choose oauth2 and copy the client ID, this is the `AUTH_DISCORD_ID`.

Reset the client secret and copy it to `AUTH_DISCORD_SECRET`.
Add the following url to the redirects: `http://localhost:3000/api/auth/callback/discord`.


Now the discord login should work.

A very simular process is done for github. Let's surf to [the github developers settings](https://github.com/settings/developers). Create a new oauth app. Choose a name, use `http://localhost:3000` as Homepage URL, and set `http://localhost:3000/api/auth/callback/discord` as Authorization callback URL.

Copy the client ID to `AUTH_GITHUB_ID` and create a new secret and copy it as `AUTH_GITHUB_SECRET`.

### Finishing up

First time running you will need to install all packages. Run the following:
```bash
npm ci
```

Next run the migrations and setup the database:
```bash
npm run db:migrate
```

Now you are ready to run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contribute

Found an error, want to edit some code, improve this project. Please open an issue, or fork and submit a pull request.

## Learn More

### Next.js
Next-js is used for the frontend rendering. Next-js also hosts the api, which is generated from the zenstack model.

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

### Zenstack
Zenstack is used to handle all database and backend related setup. 

The Zenstack schema is used to create the necessary tables in the database. Zenstack limits crud operations to users which are allowed to perform the operation. Zenstack also allows to generate routes for all models.

- [Zenstack Documentation](https://zenstack.dev/docs/the-complete-guide)

### Auth.js
Nextauth is a flexible framework which implements authentication of users. It allows to handle multiple login systems simultaniously and provides interfaces to react and prisma (zenstack is built on top of prisma).

- [Auth.js Documentation](https://next-auth.js.org/getting-started/introduction)