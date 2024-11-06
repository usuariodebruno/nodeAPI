const http = require('http');
const port = process.env.PORT || 3000; 
const app = require('./src/app');
const serv = http.createServer(app);

serv.listen(port);