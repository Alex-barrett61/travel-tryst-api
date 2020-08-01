class HealthCheckService {
  static HealthMessage(request, response) {
    response.json({ info: 'we good' });
  }
}

module.exports = HealthCheckService;
