# basic start up
## basic setup
you can use docker compose to 
```
docker compose -f "docker-compose.yml" up -d --build 
```

once containers are created. you will need to run sql in `./database/db.sql` in database to create your tables and basic admin user.
```
apt install -y postgresql
cd backend
psql -U postgres -h db -d practice_db_1 -f ./database/db.sql
```

If you do not want to install psql command, you can always connect to db container and run commands from there.


## start backend
to start backend server:
```
cd backend
PORT=80 DEBUG=run:* npm start
```

## frontned
to start frontend:
```
cd frontend
yarn dev --port 5173 --host
```