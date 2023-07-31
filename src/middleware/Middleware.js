const {
  isFunction,
  checkPureObject,
  isEmptyObject,
} = require("../globalUtils/globalUtils");
const route = require("../route/Route");
const middleware = {
  _allGlobalMiddlewares: [],
};

middleware.use = function (path, handler) {
  if (
    typeof path === "string" &&
    !isFunction(handler) &&
    checkPureObject(handler)
  ) {
    /**
     * Router handler
     * both parameters. first parameter is the path and the second one is router object
     * Exampe call: use(path,routerObject)
     */
    const allHandlersObj = handler?.routerHandlers;
    for (let routerMethod in allHandlersObj) {
      if (isEmptyObject(allHandlersObj[routerMethod])) {
        continue;
      }
      const singleHandlerObj = allHandlersObj[routerMethod];
      for (let singleRoutePath in singleHandlerObj) {
        const singleRouteHandler = singleHandlerObj[singleRoutePath];
        // combinging two path and making the proper path formatting the path, removing '/' repitation
        const combinedRoutePath = (path + singleRoutePath).replace(
          /\/\//g,
          "/"
        );
        // putting the handler in route
        route._allRoutes[routerMethod][combinedRoutePath] = singleRouteHandler;
      }
    }
  } else if (isFunction(path)) {
    /**
     * Middlewares handler
     * only one parameter
     * Exampe call: use(callback)
     */
    this._allGlobalMiddlewares.push(path);
  }
};

module.exports = middleware;
