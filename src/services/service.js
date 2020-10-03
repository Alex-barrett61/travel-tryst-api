/**
 * our base service class. All our services will be extended from here
 */
class Service {
  request;
  response;
  _user;

  constructor(request, response) {
    this.request = request;
    this.response = response;
    this._user = this.request.user;
  }

  get user() {
    return this._user;
  }
}

module.exports = Service;
