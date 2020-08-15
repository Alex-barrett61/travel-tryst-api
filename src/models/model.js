const { postgres } = require('../data-sources/connections');

class Model {
  static _postgres = postgres;

  static get postgres() {
    return this._postgres;
  }
}

module.exports = Model;
