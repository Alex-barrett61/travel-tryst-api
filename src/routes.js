const HealthCheckService = require('./services/healthCheck');
const PostService = require('./services/post');

async function callService(service, method, req, res) {
  res.json(await (new service(req))[method]());
}

function initRoutes(express) {
  express.get('/', async (req, res) => callService(HealthCheckService, 'healthCheck', req, res));
  express.get('/posts/:id', async (req, res) => callService(PostService, 'get', req, res));
}

module.exports = initRoutes;
