class Service {
  headers;
  params;
  body;

  constructor(request) {
    this.headers = request.headers;
    this.params = request.params;
    this.body = request.body;
  }
}

module.exports = Service;
