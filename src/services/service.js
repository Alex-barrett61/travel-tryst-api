/**
 * our base service class. All our services will be extended from here
 */
class Service {
  request;
  response;

  constructor(request, response) {
    this.request = request;
    this.response = response;
  }
}

module.exports = Service;
