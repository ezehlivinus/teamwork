const winston = require('winston');
require('express-async-errors');

module.exports = () => {
  process.on('unhandledRejection', ex => {
    throw ex;
  });

  if (process.env.NODE_ENV !== 'production') {
    return winston.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.simple()
        })
      ]
    });
  }

  return winston.createLogger({
    transports: [
      new winston.transports.File({
        filename: 'error/error.log',
        level: 'error'
      }),

      new winston.transports.File({
        filename: 'error/combined.log',
        level: 'info'
      }),

      new winston.transports.Console({
        format: winston.format.simple()
      })
    ],

    exceptionHandlers: [
      new winston.transports.File({
        filename: 'error/uncaughtExceptions.log'
      })
    ]
  });
};
