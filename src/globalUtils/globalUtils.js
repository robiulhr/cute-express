const URL = require("url").URL;


/**
 * checks the input is valid Object or not.
 * @param {Object} obj
 * @returns {Boolean}
 */

const checkPureObject = function (obj) {
  return null !== obj && typeof obj === "object";
};
/**
 * checks the input is whole positive Number or not.
 * @param {Number} num
 * @returns {Boolean}
 */
const checkWholePossitiveNumber = function (num) {
  return (
    typeof num === "number" &&
    num > 0 &&
    !Number.isNaN(num) &&
    Number.isInteger(num) &&
    Math.round(num) === num
  );
};
/**
 * checks the input is valid Function or not.
 * @param {Function} value
 * @returns {Boolean}
 */
const isFunction = function (value) {
  return value instanceof Function;
};
/**
 * checks the given object is empty or not.
 * @param {Object} obj
 * @returns {Boolean}
 */
const isEmptyObject = function (obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

/**
 * checks the given input is valid string or not.
 * @param {String} str 
 * @returns {Boolean}
 */
const isValidString = function (str) {
  if (!str || typeof str !== 'string') return false

  const validRegEx = /^[^\\\/&]*$/

  if (str.match(validRegEx)) {
    return true
  } else {
    return false
  }
}


/**
 * checks given input is a valid url path
 * @param {String} path 
 * @returns {Boolean}
 */
const stringIsAValidUrl = (path) => {
  try {
    new URL(path);
    return true;
  } catch (err) {
    return false;
  }
};


module.exports = {
  checkPureObject,
  checkWholePossitiveNumber,
  isFunction,
  isEmptyObject,
  isValidString,
  stringIsAValidUrl
};
