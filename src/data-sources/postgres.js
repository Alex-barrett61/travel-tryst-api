const pg = require('pg');

const { Client } = pg;

class Postgres {
  _client;

  /**
   *
   * @param {string} connectionUrl
   */
  constructor(connectionUrl) {
    this._client = new Client(connectionUrl);
  }

  async connect() {
    await this._client.connect();
    await this._client.query('SELECT 1 + 1;'); // make sure the connection is initialized
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
    const { rows } = await this._client.query(expression, args);
    return rows;
  }
}

module.exports = Postgres;
