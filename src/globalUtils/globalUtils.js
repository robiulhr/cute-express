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
 * checks is the given object is empty or not.
 * @param {Object} obj
 * @returns {Boolean}
 */
const isEmptyObject = function (obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

module.exports = {
  checkPureObject,
  checkWholePossitiveNumber,
  isFunction,
  isEmptyObject,
};
