'use strict';
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
const Pool = require('pg').Pool;
// const config = require('./config');

const pool = new Pool({
  user: 'tony',
  host: 'localhost',
  database: 'spectrumAuth',
  password: 'password',
  port: 5432,
})
app.get('/', async (request, response) => {
    const users = await pool.query('SELECT * FROM profile');
    if(users) {
        return response.status(200).json(users.rows);
    }
    throw new Error('Please check connect');
})
app.get('/events', async (request, response) => {
    const events = await pool.query('SELECT * FROM event');
    if(events) {
        return response.status(200).json(events.rows);
    }
    throw new Error('Please check connect');
})
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
