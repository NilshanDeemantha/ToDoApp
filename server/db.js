const POOL = require('pg').Pool
require('dotenv').config()

// create db connection instanece
const pool = new POOL({
    user:'postgres',
    password:"1999",
    host:'localhost',
    port: '5432',
    database:'todoapp'
})

module.exports = pool