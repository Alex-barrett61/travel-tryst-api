const Service = require('./service');

class HealthCheckService extends Service {
  constructor(...args) {
    super(...args);
  }

  healthCheck() {
    this.response.json({ info: 'we good' });
  }
}

module.exports = HealthCheckService;
