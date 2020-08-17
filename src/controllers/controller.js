/**
 * our base controller class. All controllers will be extended from here.
 */
class Controller {
  _model;

  constructor(model) {
    this._model = model;
  }

  get model() {
    return this._model;
  }
}

module.exports = Controller;
