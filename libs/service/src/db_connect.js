const { Sequelize } = require('sequelize');
const winston = require('winston');
const configService = require('./../../shared/src/config/config.service');

const { name, user, password, host, port } = configService.get('db.postgres');

module.exports = new Sequelize(name, user, password, {
  dialect: 'postgres',
  host: host,
  port: port,
  logging: winston.debug
});
