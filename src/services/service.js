/**
 * our base service class. All our services will be extended from here
 */
const logger = require('../utils/logger');

class Service {
  request;
  response;
  _user;
  _logger = logger;
  static _logger = logger;

  constructor(request, response) {
    this.request = request;
    this.response = response;
    this._user = this.request.user;
  }

  get user() {
    return this._user;
  }

  get logger() {
    return this._logger;
  }


}

module.exports = Service;
