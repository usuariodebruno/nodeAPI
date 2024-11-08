const http = require('http');
const app = require('./src/app');
const serv = http.createServer(app);

serv.listen(process.env.SERVER_PORT);

console.log(`Servidor rodando na ${process.env.SERVER_PORT}`)
console.log(`Postgres rodando na ${process.env.POSTGRES_PORT}`)