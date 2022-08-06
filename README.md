## Step by step start

Install dependencies

```
npm install
```

Set up a docker container for the database

```
docker compose up -d
```

Run the application in watch mode (it will also run all migrations)

```
npm run start:dev
```

In another terminal run data seeders

```
npm run seed:run
```

Open `pgadmin4` in your browser http://localhost:5050/ and check whenever the tables were created and data was inserted.

Default credentials:

```
username: admin@admin.com
password: root
```

Try some end-points: http://localhost:3000/api
