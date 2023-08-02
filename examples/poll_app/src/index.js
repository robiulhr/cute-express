const http = require("http")
const app = require('./app/app');

const hostname = 'localhost';
const port = 4000;


const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});