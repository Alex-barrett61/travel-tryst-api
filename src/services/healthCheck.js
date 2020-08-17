const Service = require('./service');

class HealthCheckService extends Service {
  constructor(...args) {
    super(...args);
  }

  healthCheck() {
    return { info: 'we good' };
  }
}

module.exports = HealthCheckService;
