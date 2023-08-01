const http = require("http")
const app = require('./app/app');
const dotenv = require('dotenv').config()

const hostname = process.env.HOST_NAME;
const port = process.env.PORT;


const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});