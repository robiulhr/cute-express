const { routeMethodPrototype } = require('./service')
const { handlerAssigner, handlersSimplifierInArr } = require("../globalService/globalService");
module.exports = route = {
  _allSupportedMethods: {
    "GET": true,
    "POST": true,
    "PUT": true,
    "PATCH": true,
    "DELETE": true
  },
  _allRoutes: {
    GET: {},
    POST: {},
    PUT: {},
    PATCH: {},
    DELETE: {},
  },
  /**
   * Handles get method
   * @param {String} path
   * @param  {...Function} handlers
   * @returns {Object}
   */
  get: function (path, ...handlers) {
    // simplify the input handlers in simple Array
    const handlersArr = handlersSimplifierInArr(handlers);
    handlerAssigner("GET", this._allRoutes, path, handlersArr);
    return this;
  },
  /**
   * Handles post method
   * @param {String} path
   * @param  {...Function} handlers
   * @returns {Object}
   */
  post: function (path, ...handlers) {
    // simplify the input handlers in simple Array
    const handlersArr = handlersSimplifierInArr(handlers);
    handlerAssigner("POST", this._allRoutes, path, handlersArr);
    return this;
  },
  /**
   * Handles put method
   * @param {String} path
   * @param  {...Function} handlers
   * @returns {Object}
   */
  put: function (path, ...handlers) {
    // simplify the input handlers in simple Array
    const handlersArr = handlersSimplifierInArr(handlers);
    handlerAssigner("PUT", this._allRoutes, path, handlersArr);
    return this;
  },
  /**
   * Handles patch method
   * @param {String} path
   * @param  {...Function} handlers
   * @returns {Object}
   */
  patch: function (path, ...handlers) {
    // simplify the input handlers in simple Array
    const handlersArr = handlersSimplifierInArr(handlers);
    handlerAssigner("PATCH", this._allRoutes, path, handlersArr);
    return this;
  },
  /**
   * Handles delete method
   * @param {String} path
   * @param  {...Function} handlers
   * @returns {Object}
   */
  delete: function (path, ...handlers) {
    // simplify the input handlers in simple Array
    const handlersArr = handlersSimplifierInArr(handlers);
    handlerAssigner("DELETE", this._allRoutes, path, handlersArr);
    return this;
  },
  /**
   * app.all(), used to load middleware functions at a path for all HTTP request methods. 
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
    handlerAssigner("GET", this._allRoutes, path, handlersArr);
    handlerAssigner("POST", this._allRoutes, path, handlersArr);
    handlerAssigner("PUT", this._allRoutes, path, handlersArr);
    handlerAssigner("PATCH", this._allRoutes, path, handlersArr);
    handlerAssigner("DELETE", this._allRoutes, path, handlersArr);
    return this;
  },
  /**
   * You can create chainable route handlers for a route path by using app.route()
   * @param {String} path 
   * @returns 
   */
  route: function (path) {
    // routeMethodHandlers is all stored route handlers object and all method handlers like get(), post() and more.
    const routeMethodHandlers = routeMethodPrototype(path, this._allRoutes)
    return routeMethodHandlers
  }
};
