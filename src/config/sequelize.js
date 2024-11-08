const Sequelize = require('sequelize');

// passar os dados do .env para as constantes
const dbUser = process.env.POSTGRES_USER;
const dbPassword = process.env.POSTGRES_PASSWORD;
const dbName = process.env.POSTGRES_DB_NAME; 
const dbHost = process.env.POSTGRES_HOST;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: "postgres", 
  host: dbHost, 
});

module.exports = {sequelize, Sequelize};