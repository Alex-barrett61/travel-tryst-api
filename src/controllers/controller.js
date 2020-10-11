const logger = require('../utils/logger');

/**
 * our base controller class. All controllers will be extended from here.
 */
class Controller {
  _model;
  _user;
  _logger = logger;

  constructor(model, user) {
    this._model = model;
    this._user = user;
  }

  get model() {
    return this._model;
  }

  get user() {
    return this._user;
  }

  get logger() {
    return this._logger;
  }
}

module.exports = Controller;
