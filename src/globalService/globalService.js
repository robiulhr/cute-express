const { isFunction } = require("../globalUtils/globalUtils");

/**
 * 
 * @param {String} methodType 
 * @param {Object} allRouteObj 
 * @param {String} path 
 * @param {Array} handlers 
 * @returns {void}
 */
const handlerAssigner = function (methodType, allRouteObj, path, handlers) {
  if (typeof path !== "string") {
    console.log("please, provide a valid path");
    return;
  }
  if (allRouteObj[methodType][path]) {
    console.log(`This path ${path} is already in use.`);
    return;
  }
  if (handlers.length < 1) {
    console.log("please, provide a handler.");
    return;
  } else if (handlers.length === 1) {
    if (!isFunction(handlers[0])) {
      console.log("please, provide a valid function as handler");
      return;
    }
    allRouteObj[methodType][path] = handlers;
  } else {
    allRouteObj[methodType][path] = [];
    handlers.forEach((ele) => {
      if (!isFunction(ele)) {
        console.log("please, provide a valid function as handler");
        return;
      }
      allRouteObj[methodType][path].push(ele);
    });
  }
};

module.exports = {
  handlerAssigner
}