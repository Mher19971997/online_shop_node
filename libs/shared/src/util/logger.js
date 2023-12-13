const { debug, error, warning } = require('./logger-lib');

class Logger {
  log(...message) {
    return debug(this.context, ...message);
  }
  error(...message) {
    return error(this.context, ...message);
  }
  warn(...message) {
    return warning(this.context, ...message);
  }
  debug(...message) {
    return debug(this.context, ...message);
  }
}

module.exports = Logger;
