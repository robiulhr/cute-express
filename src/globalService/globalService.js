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
 * @param {Array} inputs 
 * @returns {Object}
 */
const routeMethodInputsHandler = function (inputs) {
  let path, handlers = [];
  inputs.forEach((ele, ind) => {
    // if path is not provided than the default path will be "/" root path
    if (ind === 0) typeof ele === "string" || (typeof ele === "object" && ele.test) ? path = ele : path = "/" && handlers.push(ele)
    else handlers.push(ele)
  })
  return { path, handlers }
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
  let pathRegex;
  if (typeof strPath === "object" && strPath.test) {
    pathRegex = new RegExp(path)
  }
  if (handlers.length < 1) {
    console.log("please, provide a handler.");
    return;
  }
  if (!isFunction(handlers[0])) {
    console.log("please, provide a valid function as handler");
    return;
  }
  let splitedPath
  if (path === "/") {
    splitedPath = ['/']
  }
  // if path is not a regex expression
  if (!pathRegex && !splitedPath) {
    splitedPath = strPath.split('/').filter(ele => ele !== "")
  }
  // if handler for this path already exist
  if (allRouteObj[methodType][strPath]) {
    handlers.forEach(ele => {
      allRouteObj[methodType][strPath].handlers.push(ele);
    })
  } else {
    allRouteObj[methodType][strPath] = {
      splitedPath,
      handlers,
      pathRegex
    }
  }
  console.log(allRouteObj[methodType][strPath],"allRouteObj[methodType][strPath]")
};


const defaultHandler = function (req, res) {
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found");
};


module.exports = {
  handlersSimplifierInArr,
  routeMethodInputsHandler,
  handlerAssigner,
  defaultHandler,
}