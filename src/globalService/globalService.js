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
      if (Array.isArray(handler)) {
        arraySimplyFier(handler);
      } else resultArr.push(handler);
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
  let strPath = path
  if (typeof strPath !== "string") strPath = String(strPath);
  if (handlers.length < 1) {
    console.log("please, provide a handler.");
    return;
  }
  if (!isFunction(handlers[0])) {
    console.log("please, provide a valid function as handler");
    return;
  }
  const splitedPath = strPath.split('/').filter(ele => ele !== "")
  // if handler for this path already exist
  if (allRouteObj[methodType][strPath]) {
    handlers.forEach(ele => {
      allRouteObj[methodType][strPath].handlers.push(ele);
    })
  } else {
    allRouteObj[methodType][strPath] = {
      splitedPath,
      handlers
    }
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