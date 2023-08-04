const { handlerAssigner, handlersSimplifierInArr } = require("../globalService/globalService");
const { isFunction } = require("../globalUtils/globalUtils");
const { routeMethodPrototype } = require('../route/service')

module.exports = Router = function () {
  return {
    routerHandlers: {
      GET: {},
      POST: {},
      PUT: {},
      PATCH: {},
      DELETE: {},
    },
    /**
     * Handles Get request for router
     * @param {String} path
     * @param {Array} handlers
     * @returns {void,Object}
     */
    get: function (path, ...handlers) {
      // simplify the input handlers in simple Array
      const handlersArr = handlersSimplifierInArr(handlers);
      handlerAssigner("GET", this.routerHandlers, path, handlersArr);
      return this;
    },
    /**
     * Handles Post request for router
     * @param {String} path
     * @param {Array} handlers
     * @returns {void,Object}
     */
    post: function (path, ...handlers) {
      // simplify the input handlers in simple Array
      const handlersArr = handlersSimplifierInArr(handlers);
      handlerAssigner("POST", this.routerHandlers, path, handlersArr);
      return this;
    },
    /**
     * Handles Put request for router
     * @param {String} path
     * @param {Array} handlers
     * @returns {void,Object}
     */
    put: function (path, ...handlers) {
      // simplify the input handlers in simple Array
      const handlersArr = handlersSimplifierInArr(handlers);
      handlerAssigner("PUT", this.routerHandlers, path, handlersArr);
      return this;
    },
    /**
     * Handles Patch request for router
     * @param {String} path
     * @param {Array} handlers
     * @returns {void,Object}
     */
    patch: function (path, ...handlers) {
      // simplify the input handlers in simple Array
      const handlersArr = handlersSimplifierInArr(handlers);
      handlerAssigner("PATCH", this.routerHandlers, path, handlersArr);
      return this;
    },
    /**
     * Handles Delete request for router
     * @param {String} path
     * @param {Array} handlers
     * @returns {void,Object}
     */
    delete: function (path, ...handlers) {
      // simplify the input handlers in simple Array
      const handlersArr = handlersSimplifierInArr(handlers);
      handlerAssigner("DELETE", this.routerHandlers, path, handlersArr);
      return this;
    },
    /**
   * router.all(), used to load middleware functions at a path for all HTTP request methods. 
   * For example, the following handler is executed for requests to the route “/secret” 
   * whether using GET, POST, PUT, DELETE, or any other HTTP request method supported in the app.METHOD.
   * @param {String} path 
   * @param  {...Function} handlers 
   * @returns {Object}
   */
    all: function (path, ...handlers) {
      // simplify the input handlers in simple Array
      const handlersArr = handlersSimplifierInArr(handlers);
      // puting the handler to all type of method handlers
      handlerAssigner("GET", this.routerHandlers, path, handlersArr);
      handlerAssigner("POST", this.routerHandlers, path, handlersArr);
      handlerAssigner("PUT", this.routerHandlers, path, handlersArr);
      handlerAssigner("PATCH", this.routerHandlers, path, handlersArr);
      handlerAssigner("DELETE", this.routerHandlers, path, handlersArr);
      return this;
    },
    /**
     * You can create chainable route handlers for a route path by using app.route()
     * @param {String} path 
     * @returns 
     */
    route: function (path) {
      // routeMethodHandlers is all stored route handlers object and all method handlers like get(), post() and more.
      const routeMethodHandlers = routeMethodPrototype(path, this.routerHandlers)
      return routeMethodHandlers
    },
    /**
     * invoked for any requests passed to this router
     * @param  {Array} handlers 
     */
    use: function (...handlers) {
      // simplify the input handlers in simple Array
      const handlersArr = handlersSimplifierInArr(handlers);
      handlersArr.forEach(ele => {
        if (!isFunction(ele)) {
          throw new Error("please, provide a function as the handler.")
        }
        for (let singleRouterHandler in this.routerHandlers) {
          // single route handler object
          const singleRouteHandlerObj = this.routerHandlers[singleRouterHandler]
          for (let handlerPath in singleRouteHandlerObj) {
            // all handlers for a specific method type and path
            const handlersForPath = singleRouteHandlerObj[handlerPath]
            // if this path doesn't exists
            if (!handlersForPath) handlersForPath = []
            // putting all route level middlewares for all route paths
            handlersForPath.push(ele)
          }
        }
      })
    }
  }
};
