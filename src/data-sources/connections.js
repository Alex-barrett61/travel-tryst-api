const { postgresUrl } = require('config');
const Postgres = require('./postgres');

// our individual Postgres instance. Will be exported and used throughout the application
const postgres = new Postgres(postgresUrl);

module.exports = {
  postgres
};
