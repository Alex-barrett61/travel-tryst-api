const express = require('express');
const bodyParser = require('body-parser');

/**
 * our express server. starts up on the provided point and applies the middleware we need
 */
class Server {
  port;
  listener;
  express = express();

  constructor(port) {
    this.port = port;
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true, }));
  }

  async start() {
    this.listener = await this.express.listen(this.port, () => {
      console.log(`server running on port ${this.port}.`);
    });
  }

  stop() {
    this.listener.close();
  }
}

module.exports = Server;
