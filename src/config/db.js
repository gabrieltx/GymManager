const { Pool } = require('pg')

module.exports = new Pool({
    user: 'postgres',
    password: '8062',
    host: 'localhost',
    port: 5432,
    database: 'gymmanager'
})

