const { postgres } = require('../data-sources/connections');

/**
 * our base model class. All models will be extended from here.
 */
class Model {
  static _postgres = postgres;

  static get postgres() {
    return this._postgres;
  }
}

module.exports = Model;
