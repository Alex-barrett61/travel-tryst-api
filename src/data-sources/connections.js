const { postgresUrl } = require('config');
const Postgres = require('./postgres');

const postgres = new Postgres(postgresUrl);

module.exports = {
  postgres
};
