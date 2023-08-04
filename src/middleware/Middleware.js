const {
  isFunction,
  checkPureObject,
  isEmptyObject,
} = require("../globalUtils/globalUtils");
const { handlerAssigner, handlersSimplifierInArr } = require("../globalService/globalService");
const route = require("../route/Route");
const middleware = {
  _allGlobalMiddlewares: [],
};

middleware.use = function (path, ...handlers) {
  // simplify the input handlers in simple Array
  const handlersArr = handlersSimplifierInArr(handlers);
  handlersArr.forEach(handler => {
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
      // all handlers object 
      const allHandlersObj = handler?.routerHandlers;
      for (let routerMethod in allHandlersObj) {
        const singleHandlerObj = allHandlersObj[routerMethod];
        if (isEmptyObject(singleHandlerObj)) {
          continue;
        }
        for (let singleRoutePath in singleHandlerObj) {
          const singleRouteHandler = singleHandlerObj[singleRoutePath];
          // combinging two path and making the proper path formatting the path, removing '/' repitation
          const combinedRoutePath = (path + singleRoutePath).replace(
            /\/\//g,
            "/"
          );
          let finalRouteHandlers = route._allRoutes[routerMethod][combinedRoutePath];
          // if this path doesn't already exist
          if (!finalRouteHandlers) finalRouteHandlers = []
          // putting the handlers for this route
          singleRouteHandler.forEach(ele => {
            finalRouteHandlers.push(ele);
          })
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
  })
};

module.exports = middleware;
