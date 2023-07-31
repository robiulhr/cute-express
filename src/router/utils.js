const { isFunction } = require("../globalUtils/globalUtils");

/**
 * checks the path and handler's validity and type.
 * @param {String} path
 * @param {Function} handler
 * @returns {void}
 */
const pathAndHandlerChecker = function (path, handler) {
  if (typeof path !== "string") {
    console.log("Please, provide a proper path for the handler.");
    return;
  }
  if (!isFunction(handler)) {
    console.log("Please, provide a proper callback as the handler.");
    return;
  }
};

module.exports = {
  pathAndHandlerChecker,
};
