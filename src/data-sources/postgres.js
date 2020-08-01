const pg = require('pg');

const { Client, Pool } = pg;

module.exports = class Postgres {
  _client;
  _pool;

  constructor(options) {
    this._client = new Client();
    this._pool = new Pool(options);
  }

  async connect() {
    this._client.connect();
  }

  disconnect() {
    this._client.disconnect();
  }

  /**
   *
   * @param {string} expression
   * @param {string[]} args
   */
  async query(expression, args) {
    const { rows } = await this._pool.query(expression, args);
    return rows;
  }
};
