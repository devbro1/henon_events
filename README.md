# basic start up
## basic setup
you can use docker compose to 
```
docker compose -f "docker-compose.yml" up -d --build 
```

once containers are created. you will need to run sql in `./database/db.sql` in database to create your tables and basic admin user.
```
apt install -y postgresql
psql -U postgres -h db -d practice_db_1 -f /path/to/your_file.sql
```


## start backend
to start backend server:
```
cd backend
PORT=80 DEBUG=run:* npm start
```