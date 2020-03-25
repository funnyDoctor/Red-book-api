const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');


const register = require('./controllers/register');
const signin = require('./controllers/signin');

//Connect to DB
const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.HEROKU_POSTGRESQL_GREEN_URL,
        ssl: true
    }
});

//App and port
const app = express();
const port = process.env.PORT || 3000;
const blue = '\x1b[34m%s\x1b[0m';

//Middleware
app.use(cors());
app.use(bodyParser.json());

//Methods
app.get('/', (req, res) => { res.send("Оно живое:)") });
app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });


//Server
app.listen(port, () => console.log(blue, `Server has been started on port ${port}!`));