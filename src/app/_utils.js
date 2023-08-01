const { defaultHandler } = require("../route/_utils");



const reqParamsHandler = function (registeredUrl, reqUrl, reqObject) {
  const registeredUrlParts = registeredUrl.split('/')
  const reqUrlParts = reqUrl.split('/')
  const params = {};

  for (let i = 0; i < registeredUrlParts.length; i++) {
    if (registeredUrlParts[i].startsWith(':')) {
      const paramName = registeredUrlParts[i].slice(1);
      params[paramName] = reqUrlParts[i];
    }
  }
  reqObject.params = params
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
 * checks if any not found handler is available. if so, returns it Otherwise, returns defaultHandler
 * @param {Object} AllHandlersForTheMethod 
 * @param {Function} defaultHandler 
 * @returns {Array}
 */
const passDefaultHandler = function (AllHandlersForTheMethod, defaultHandler) {
  let routeHandler;
  routeHandler = AllHandlersForTheMethod["*"]
    ? AllHandlersForTheMethod["*"]
    : [defaultHandler];
  return routeHandler
}

/**
 * Select which route handler should be run depending the request URL
 * @param {Object} routes
 * @param {String} methodName
 * @param {String} reqUrl
 * @param {Object} reqObject
 * @returns {Array}
 */
const selectRouteHandler = function (routes, methodName, reqUrl, reqObject) {
  let routeHandler;
  const AllHandlersForTheMethod = routes._allRoutes[methodName];
  for (let registeredUrl in AllHandlersForTheMethod) {
    if (reqUrl === '/') {
      if (AllHandlersForTheMethod[reqUrl]) routeHandler = AllHandlersForTheMethod[reqUrl];
      else routeHandler = passDefaultHandler(AllHandlersForTheMethod, defaultHandler)
      return routeHandler
    }
    else if (!matchRouteHandlerReqUrl(registeredUrl, reqUrl)) {
      routeHandler = passDefaultHandler(AllHandlersForTheMethod, defaultHandler)
    } else {
      routeHandler = AllHandlersForTheMethod[registeredUrl];
      if (registeredUrl.includes(":")) {
        reqParamsHandler(registeredUrl, reqUrl, reqObject)
      }
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
  selectRouteHandler,
  callRouteHandlerAndMiddlewares
};
