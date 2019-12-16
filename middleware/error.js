const logger = require('../startup/logging')();

module.exports = (error, req, res, next) => {
  logger.error(error.message, error);

  let data = {
    status: 'error',
    message: 'Something failed...',
    'graceful-details': error.message
  };

  res.status(500).send(data);
};
