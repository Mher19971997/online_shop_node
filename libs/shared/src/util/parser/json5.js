const baseJson5 = require('json5');

/**
 * @name parse
 * @param text
 * @param reviver
 */
const parse = (text, reviver) => {
  try {
    return baseJson5.parse(text, reviver);
  } catch (err) {
    console.error('JSON5.parse:error', err);
  }
  return null;
};

/**
 * @name stringify
 * @param value
 * @param replacer
 * @param space
 */
const stringify = (value, replacer, space) => {
  try {
    return baseJson5.stringify(value, replacer, space);
  } catch (err) {
    console.error('JSON5.parse:error', err);
  }
  return null;
};

const json5 = { parse, stringify };

module.exports = json5;
