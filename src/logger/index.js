const winston = require('winston');

const { LOG_LEVEL = 'debug' } = process.env;

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: LOG_LEVEL,
      timestamp: () => (new Date()).toISOString()
    })
  ]
});

module.exports = logger;
