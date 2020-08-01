const config = require('config');
const Server = require('./server.js');
const initRoutes = require('./routes');

const { port } = config;

async function main() {
  const server = new Server(port);
  await server.start();
  initRoutes(server.express);
}

main().then(() => console.log('...idle'));
