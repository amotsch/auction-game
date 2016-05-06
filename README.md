# Auction Game

1/ Install the project dependencie : <b>npm install</b>

2/ Install bower dependencie  : <b>bower install</b>

3/ Create a MySQL Database
Server : localhost
Database Name : crossover
Database username : crossover
Database userpassword : crossover

4/ Import app\sql\auction-game.sql in your database

5/ You can change configs in app\config.js

6/ Run <b>node app-server.js</b>

7/ With your browser go to localhost:XX (XX is the config.port defined in config.js)

8/ Launch tests with mocha (npm install -g mocha)

9/ (TODO) I cannot test express routes, the express server send 404 response to supertest

10/ Assumptions : simple data model, several users logged into the browser tabs, user is disconnected when page refresh, no minification