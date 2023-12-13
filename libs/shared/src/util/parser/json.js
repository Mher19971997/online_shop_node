/**
 * @name parse
 * @param text
 * @param reviver
 */
const parse = (text, reviver) => {
  try {
    return JSON.parse(text, reviver);
  } catch (err) {
    console.error('JSON.parse:error', err);
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
    return JSON.stringify(value, replacer, space);
  } catch (err) {
    console.error('JSON.stringify:error', err);
  }
  return null;
};

const json = { parse, stringify };
module.exports = json;
