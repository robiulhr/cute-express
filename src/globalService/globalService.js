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
  handlerAssigner,
  defaultHandler
}