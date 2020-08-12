const pg = require('pg').native;

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
