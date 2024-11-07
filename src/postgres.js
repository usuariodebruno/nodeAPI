const postgres = require('postgres')

var sql = postgres({
    "user": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.POSTGRES_DATABASE,
    "localhost": process.env.POSTGRES_HOST,
    "port": process.env.POSTGRES_PORT,
});

module.exports = { sql };
