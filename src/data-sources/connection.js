const config = require('config');
const Postgres = require('./postgres');

const { postgres } = config;

module.exports = new Postgres(postgres);
