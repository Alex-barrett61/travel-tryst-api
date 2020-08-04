const { postgresUrl } = require('config');
const Postgres = require('./postgres');

module.exports = new Postgres(postgresUrl);
