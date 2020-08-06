const HealthCheckService = require('./services/healthCheck');
const PostService = require('./services/post');

function initRoutes(express) {
  express.get('/', (req, res) => new HealthCheckService(req, res).healthCheck());
  express.get('/posts/:id', (req, res) => new PostService(req, res).get());
}

module.exports = initRoutes;
