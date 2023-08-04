const { isFunction } = require("../globalUtils/globalUtils");


/**
 * Takes array of array of simple array and returns simple array of handlers
 * Example:
 * input : [[ [Function: cb0], [Function: cb1], [Function: cb2] ],[[Function (anonymous)]]
 * output:[[Function: cb0], [Function: cb1], [Function: cb2], [Function (anonymous)]]
 * @param {Array} handlers 
 * @returns {Array}
 */

const handlersSimplifierInArr = function (handlers) {
  const resultArr = [];
  const arraySimplyFier = function (arrayOfArr) {
    arrayOfArr.forEach((handler) => {
      if (isFunction(handler)) resultArr.push(handler);
      else if (Array.isArray(handler)) {
        arraySimplyFier(handler);
      }
    })
  }
  arraySimplyFier(handlers);
  return resultArr
}

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
  if (handlers.length < 1) {
    console.log("please, provide a handler.");
    return;
  }
  if (!isFunction(handlers[0])) {
    console.log("please, provide a valid function as handler");
    return;
  }
  // if handler for this path already exist
  if (allRouteObj[methodType][path]) {
    handlers.forEach(ele => {
      allRouteObj[methodType][path].push(ele);
    })
  } else {
    allRouteObj[methodType][path] = handlers;
  }
};


const defaultHandler = function (req, res) {
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found");
};


module.exports = {
  handlersSimplifierInArr,
  handlerAssigner,
  defaultHandler,
}