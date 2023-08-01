const { defaultHandler } = require("../route/_utils");



const reqParamsHandler = function (url, reqObject) {
  console.log(url)
}

/**
 * 
 * @param {String} registeredUrl 
 * @param {String} reqUrl 
 * @returns {Function,Array}
 */
const matchRouteHandlerReqUrl = function (registeredUrl, reqUrl) {
  const registeredUrlParts = registeredUrl.split('/')
  const reqUrlParts = reqUrl.split('/')
  if (registeredUrlParts.length !== reqUrlParts.length) return false;
  let result = true
  registeredUrlParts.forEach((ele, ind) => {
    if (!ele.startsWith(':')) {
      if (ele !== reqUrlParts[ind]) {
        result = false
        return result
      }
    }
  })
  return result
}
/**
 * Select which route handler should be run depending the request URL
 * @param {Object} routes
 * @param {String} methodName
 * @param {String} reqUrl
 * @returns {Array}
 */
const selectRouteHandler = function (routes, methodName, reqUrl) {
  let routeHandler;
  const AllHandlersForTheMethod = routes._allRoutes[methodName];
  for (let registeredUrl in AllHandlersForTheMethod) {
    if (reqUrl === '/') {
      routeHandler = AllHandlersForTheMethod[reqUrl];
      return routeHandler
    }
    else if (!matchRouteHandlerReqUrl(registeredUrl, reqUrl)) {
      routeHandler = AllHandlersForTheMethod["*"]
        ? AllHandlersForTheMethod["*"]
        : [defaultHandler];
    } else {
      routeHandler = AllHandlersForTheMethod[registeredUrl];
      return routeHandler
    }
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
