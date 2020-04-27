const PG_Client = require('pg');
DB_config = require('./db_config.json');
const DB_URL = process.env.DATABASE_URL || DB_config.URL;

//This will error out if you do not have the database_url or in your config file.
const PGclient = new PG_Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});

module.exports = PGclient