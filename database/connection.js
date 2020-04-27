const { Client } = require('pg');
try {
    DB_config = require('./db_config.json');
}
catch(error) {
    console.log("No db_config.json (expected on deployment)");
}

const DB_URL = process.env.DATABASE_URL || DB_config.URL;

//This will error out if you do not have the database_url or in your config file.
const PGclient = new Client({
    connectionString: DB_URL,
    ssl: true,
});

module.exports = PGclient