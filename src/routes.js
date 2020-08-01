const HealthCheckService = require('./services/healthCheck');
const PostService = require('./services/post');

function initRoutes(express) {
  express.get('/', HealthCheckService.HealthMessage);
  express.get('/posts/:id', PostService.Get);
}

module.exports = initRoutes;
