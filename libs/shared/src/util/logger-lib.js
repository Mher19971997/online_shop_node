const { json } = require('./parser/json');
const { parse, stringify } = require('./parser/json5');

const wd = process.cwd();

/**
 * @name logger
 * @param args
 */
const logger = (...args) => process.stdout.write(`${args[0]} \n`);

/**
 * @name Log
 * @param level
 * @constructor
 */
const Log = (level) => {
  const loglevel = 'debug';
  return (...data) => {
    const moduleFile = `${global.__module}:${
      global.__method || global.__function || 'anonymous'
    }():${global.__line}`;

    if (level === 'error') {
      return logError(level, moduleFile, data);
    }
    if (loglevel === 'debug') {
      return logMessage(level, moduleFile, data);
    }
    if (loglevel === level) {
      return logMessage(level, moduleFile, data);
    }
    return false;
  };
};

/**
 * @name logMessage
 * @param level
 * @param moduleFile
 * @param message
 */
const logMessage = (level, moduleFile, message) => {
  const initial = 'initial';
  return logger(
    `[${level}] [${initial}] [${moduleFile
      .replace(wd, '')
      .replace(/\\/gu, '/')}] [${stringify(message)}]`
  );
};

/**
 * @name logError
 * @param level
 * @param moduleFile
 * @param message
 */
const logError = (level, moduleFile, message) =>
  logger(
    `[${level}] [${moduleFile
      .replace(wd, '')
      .replace(/\\/gu, '/')}] [${stringify(
      (message instanceof Error &&
        (() => {
          const stackSlice = (message.stack || '')
            .replace(/\\/gu, '/')
            .replace(new RegExp(process.cwd().replace(/\\/gu, '/'), 'ugm'), '')
            .split('\n');
          const stack = (json.stringify(stackSlice.splice(1, 2)) || '')
            .replace(/ {2}/gmu, '')
            .replace(/\\/gu, '/');
          return `name: ${message.name}, message: ${message.message}, ${stack}`;
        })()) ||
        message
    )}]`
  );

/**
 * @name error
 */
const error = Log('error');

/**
 * @name warning
 */
const warning = Log('warning');

/**
 * @name debug
 */
const debug = Log('debug');

/**
 * @name info
 */
const info = Log('info');

module.exports = {
  error,
  warning,
  debug,
  info
}
