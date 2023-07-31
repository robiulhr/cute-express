const { defaultHandler } = require("../route/_utils");
const { isFunction } = require("../globalUtils/globalUtils");

/**
 * Select which route handler should be run depending the request URL
 * @param {Object} routes
 * @param {String} methodName
 * @param {String} reqUrl
 * @returns {Function}
 */
const selectRouteHandler = function (routes, methodName, reqUrl) {
  let routeHandler;
  if (!routes._allRoutes[methodName][reqUrl]) {
    routeHandler = routes._allRoutes[methodName]["*"]
      ? routes._allRoutes[methodName]["*"]
      : defaultHandler;
  } else {
    routeHandler = routes._allRoutes[methodName][reqUrl];
  }
  return routeHandler;
};

/**
 * calls all global middlewares depending on next call
 * @param {Array} globalMiddlewares
 * @param {Object} reqObject
 * @param {Object} resObject
 *
 */
const callGlobalMiddlewares = function (
  globalMiddlewares,
  reqObject,
  resObject
) {
  let ind = 0;
  function next() {
    if (ind < globalMiddlewares._allGlobalMiddlewares.length) {
      const singleMiddleware = globalMiddlewares._allGlobalMiddlewares[ind];
      ind++;
      singleMiddleware(reqObject, resObject, next);
    }
  }
  next();
};
/**
 * calls all route specific middlewares and route handler depending on next call
 * @param {Array} routeHandlerAndMiddlewares
 * @param {Object} reqObject
 * @param {Object} resObject
 */
const callRouteHandlerAndMiddlewares = function (
  routeHandlerAndMiddlewares,
  reqObject,
  resObject
) {
  let ind = 0;
  function next() {
    // handling all global middlewares and routes handlers
    if (isFunction(routeHandlerAndMiddlewares)) {
      // calling the route handler
      routeHandlerAndMiddlewares(reqObject, resObject);
    } else {
      if (ind < routeHandlerAndMiddlewares.length - 1) {
        const singleMiddleware = routeHandlerAndMiddlewares[ind];
        ind++;
        // calling middleware for this route
        singleMiddleware(reqObject, resObject, next);
      } else {
        // calling the route handler
        routeHandlerAndMiddlewares[ind](reqObject, resObject);
      }
    }
  }
  next();
};

module.exports = {
  selectRouteHandler,
  callGlobalMiddlewares,
  callRouteHandlerAndMiddlewares,
};
