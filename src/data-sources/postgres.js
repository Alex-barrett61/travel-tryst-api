const pg = require('pg').native;

const { Client } = pg;

/**
 * our class for managing connections to Postgres databases
 */
class Postgres {
  _client;

  /**
   *
   * @param {string} connectionUrl
   */
  constructor(connectionUrl) {
    this._client = new Client(connectionUrl);
  }

  /**
   *
   * @returns {Promise<void>}
   *
   * connect to the remote Postgres instance
   */
  async connect() {
    await this._client.connect();
  }

  /**
   * disconnect from remote postgres on shutdown
   */
  disconnect() {
    this._client.end();
  }

  /**
   *
   * @param {string} expression
   * @param {string[]} args
   *
   * our query method we use to interact with Postgres
   */
  async query(expression, args) {
    const { rows } = await this._client.query(expression, args);
    return rows;
  }
}

module.exports = Postgres;
