const { defaultHandler } = require("../globalService/globalService");


/**
 * 
 * @param {String} registeredUrl 
 * @param {Object} reqUrl 
 * @param {Object} reqObject 
 */
const reqParamsHandler = function (registereSpliteddUrlArr, reqUrl, reqObject) {
  const reqUrlParts = reqUrl.split('/').filter(ele => ele !== "")
  const params = {};
  for (let i = 0; i < registereSpliteddUrlArr.length; i++) {
    if (registereSpliteddUrlArr[i].startsWith(':')) {
      const paramName = registereSpliteddUrlArr[i].slice(1);
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
const matchRouteHandlerReqUrl = function (registereSpliteddUrlArr, reqUrl) {
  const reqUrlParts = reqUrl.split('/').filter(ele => ele !== "");
  if (registereSpliteddUrlArr.length !== reqUrlParts.length) return false;
  let result = true
  registereSpliteddUrlArr.forEach((registeredUrlPart, ind) => {
    if (!registeredUrlPart.startsWith(':')) {
      // creating regex for the registered path adding ^ and $ start-of-line and end-of-line respectively
      const modifiedUrlPart = (registeredUrlPart.startsWith("^") ? "" : "^") + registeredUrlPart + (registeredUrlPart.endsWith("$") ? "" : "$")
      const urlRegx = new RegExp(modifiedUrlPart)
      if (!urlRegx.test(reqUrlParts[ind])) {
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
  let routeHandlers = []
  // all Handlers Object for the method
  const AllHandlersForTheMethod = routes._allRoutes[methodName];
  // get the registeredUrl path for the method type
  for (let registeredUrl in AllHandlersForTheMethod) {
    // splitedpath array of the url path 
    for (let registereSpliteddUrl in AllHandlersForTheMethod[registeredUrl]) {
      if (registereSpliteddUrl = "splitedPath") {
        // defining splitedpath array of the url path 
        const registereSpliteddUrlArr = AllHandlersForTheMethod[registeredUrl][registereSpliteddUrl]
        if (reqUrl === '/') {
          if (AllHandlersForTheMethod[reqUrl]) routeHandlers = AllHandlersForTheMethod[reqUrl];
          else routeHandlers = passDefaultHandler(AllHandlersForTheMethod, defaultHandler)
          return routeHandlers
        }
        else if (!matchRouteHandlerReqUrl(registereSpliteddUrlArr, reqUrl)) {
          routeHandlers = passDefaultHandler(AllHandlersForTheMethod, defaultHandler)
        } else {
          routeHandlers = AllHandlersForTheMethod[registeredUrl].handlers;
          if (registeredUrl.includes(":")) {
            reqParamsHandler(registereSpliteddUrlArr, reqUrl, reqObject)
          }
          return routeHandlers
        }
      }

    }

  }
  return routeHandlers;
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
    if (ind < routeHandlerAndMiddlewares.length-1) {
      const singleMiddleware = routeHandlerAndMiddlewares[ind];
      ind++;
      // calling middleware for this route
      singleMiddleware(reqObject, resObject, next);
    } else {
      const routeHandler = routeHandlerAndMiddlewares[ind]
      // calling the route handler
      if(routeHandler) routeHandler(reqObject, resObject);
    }
  }
  next();
};



module.exports = {
  selectRouteHandler,
  callRouteHandlerAndMiddlewares
};
