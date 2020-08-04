const { postgresUrl } = require('config');
const Postgres = require('./postgres');

const connection = new Postgres(postgresUrl);
module.exports = connection;
