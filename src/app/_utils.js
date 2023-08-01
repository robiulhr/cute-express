const { defaultHandler } = require("../route/_utils");

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
 * calls all global middlewares, route specific middlewares and route handler depending on next call
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
    if (ind < routeHandlerAndMiddlewares.length - 1) {
      const singleMiddleware = routeHandlerAndMiddlewares[ind];
      ind++;
      // calling middleware for this route
      singleMiddleware(reqObject, resObject, next);
    } else {
      const routeHandler = routeHandlerAndMiddlewares[ind]
      // calling the route handler
      routeHandler(reqObject, resObject);
    }
  }
  next();
};



module.exports = {
  reqParamsHandler,
  selectRouteHandler,
  callRouteHandlerAndMiddlewares
};
