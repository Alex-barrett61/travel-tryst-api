require('dotenv').config();
const config = require('config');
const { postgres } = require('./data-sources/connections');
const Server = require('./server.js');
const initRoutes = require('./routes');

const { port } = config;

async function main() {
  console.log('connecting');
  await postgres.connect();
  const server = new Server(port);
  await server.start();
  initRoutes(server.express);
}

main().then(() => console.log('...idle'));
