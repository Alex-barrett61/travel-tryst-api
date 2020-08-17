const HealthCheckService = require('./services/healthCheck');
const PostService = require('./services/post');

/**
 *
 * @param express - the initialized version of our express package
 *
 * this is where we define our routes. When the routes are matched by a caller we forward the request to the defined
 * service and specify which method should be used. We also define the where in the express request object we should
 * pull the arguments the service method is expecting from. The advantage is now our HTTP layer and our services are
 * separated so that our services can be extended and re-used by anything that can provide what they require - which
 * includes service -> service communication. This also means our services can potentially be broken into separate
 * pieces and scaled individually as needed.
 */
function initRoutes(express) {
  express.get('/', async (req, res) => callService(HealthCheckService, 'healthCheck', [], req, res));
  express.get('/post/:id', async (req, res) => callService(PostService, 'get', ['params.id'], req, res));
}

/**
 *
 * @param service - the actual service we are planning to use
 * @param {string} method - the name of the method we are going to call within that service
 * @param {Array<string>} expectedArgs - an array of arguments we want to pass to the method e.g. ['body.name']
 * @param {object} request - the express given request object
 * @param {object} response - the express given response object
 * @returns {Promise<void>}
 *
 * initializes the service we need and calls the provided method with the provided args. This gives a customized
 * service instance for each caller.
 */
async function callService(service, method, expectedArgs, request, response) {
  const methodArgs = parseServiceArguments(expectedArgs, request);
  response.json(await (new service(request))[method](...methodArgs));
}

/**
 *
 * @param {Array<string>} args - an array of arguments we want to pass to the method e.g. ['body.name']
 * @param {object} request - the express given request object
 * @returns {Array<any>}
 *
 * uses the parameters we define in initRoutes to pull the actual values out of the express request object.
 */
function parseServiceArguments(args, request) {
  const parsedArgs = [];
  for (const argument of args) {
    const [type, name] = argument.split('.');
    parsedArgs.push(request[type][name]);
  }
  return parsedArgs;
}

module.exports = initRoutes;
