const logger = require('../startup/logging')();

module.exports = (error, req, res, next) => {
  logger.error(error.message, error);
  res.status(500).send({
    status: 'error',
    message: 'Something failed...',
    'graceful-details': error.message
  });
};
