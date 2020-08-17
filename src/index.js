require('dotenv').config();
const config = require('config');

const { postgres } = require('./data-sources/connections');
const Server = require('./server.js');
const initRoutes = require('./routes');

const { port } = config;

/**
 *  function to start up the application
 *
 * @returns {Promise<Server>}
 */
async function bootUp() {
  console.log('connecting');
  await postgres.connect();
  const server = new Server(port);
  await server.start();
  initRoutes(server.express);
  return server;
}

/**
 *
 * @param {Server} server - our HTTP server
 * @returns {Promise<void>}
 *
 * function to be triggered in order to shut down the application gracefully.
 */
async function shutDown(server) {
  console.log('\n shutting down');
  await server.stop();
  await postgres.disconnect();
  console.log('done');
}

/**
 * trigger the startup process
 */
bootUp().then((server) => {
  console.log('...idle');
  process.on('SIGTERM', () => shutDown(server));
  process.on('SIGINT', () => shutDown(server));
}).catch(console.log); // log any errors that occur while starting up
