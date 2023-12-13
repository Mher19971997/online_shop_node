const winston = require('winston');
const colors = require('sequelize-log-syntax-colors');

winston.loggers.add('database', {
  console: {
    level: 'info',
    colorize: true,
    label: 'sequelize',
    formatter: function(obj) {
      var colorfull = {
        colorize: true,
        label: obj.label,
        level: obj.level,
        message: colors(obj.message)
      }
      return winston.common.log(colorfull);
    }
  },
});

module.exports = winston.loggers.loggers;