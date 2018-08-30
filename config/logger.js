const winston = require('winston');

const logger = winston.createLogger({});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
    ),
    colorize: true,
  }));
} else if (process.env.NODE_ENV === 'production') {
  logger.add(new winston.transports.File({
    filename: 'server_logs/error.log',
    level: 'error',
    json: true,
    colorize: false,
  }));

  logger.add(new winston.transports.File({
    filename: 'server_logs/combined.log',
    json: true,
    colorize: false,
  }));
}

module.exports = logger;
