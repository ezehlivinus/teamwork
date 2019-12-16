const Sequelize = require('sequelize');
const config = require('config');
const logger = require('./logging')();

const connection = config.get('db');
const sequelize = new Sequelize(connection.database, connection.user, connection.password, {
  host: connection.host,
  port: connection.port,
  dialect: 'postgres'
});

sequelize
  .authenticate()
  .then(() => logger.info(`Connected to postgres: ${connection.database} db...`))
  .catch(ex => {
    throw ex;
  });

module.exports.sequelize = sequelize;
