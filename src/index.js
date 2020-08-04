require('dotenv').config();
const config = require('config');
const connection = require('./data-sources/connection');
const Server = require('./server.js');
const initRoutes = require('./routes');

const { port } = config;

async function main() {
  console.log('connecting');
  await connection.connect();
  const server = new Server(port);
  await server.start();
  initRoutes(server.express);
}

main().then(() => console.log('...idle'));
