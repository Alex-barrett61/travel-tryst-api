const bunyan = require('bunyan')
const bformat = require('bunyan-format')

const formatOut = bformat({ outputMode: 'short' });
const logger = bunyan.createLogger({ name: 'app', stream: formatOut, level: 'debug' } );

module.exports = logger;
