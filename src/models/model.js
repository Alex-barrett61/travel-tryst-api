const { postgres } = require('../data-sources/connections');
const generateId = require('../utils/generateId');
const logger = require('../utils/logger');

/**
 * our base model class. All models will be extended from here.
 */
class Model {
  type;
  static _logger = logger;
  static _postgres = postgres;

  /**
   *
   * @param {string} type
   */
  constructor(type) {
    this.type = type;
  }

  static get postgres() {
    return this._postgres;
  }

  static get logger() {
    return this._logger;
  }

  generateId() {
    return generateId(this.type);
  }
}

module.exports = Model;
