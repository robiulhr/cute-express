const { routeMethodPrototype } = require('./service')
const { routeMethodInputsHandler, handlerAssigner, handlersSimplifierInArr } = require("../globalService/globalService");
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
   * @param {Array} inputs
   * @returns {Object}
   */
  get: function (...inputs) {
    const { path, handlers } = routeMethodInputsHandler(inputs)
    // simplify the input handlers in simple Array
    const handlersArr = handlersSimplifierInArr(handlers);
    handlerAssigner("GET", this._allRoutes, path, handlersArr);
    return this;
  },
  /**
   * Handles post method
   * @param {Array} inputs
   * @returns {Object}
   */
  post: function (...inputs) {
    const { path, handlers } = routeMethodInputsHandler(inputs)
    // simplify the input handlers in simple Array
    const handlersArr = handlersSimplifierInArr(handlers);
    handlerAssigner("POST", this._allRoutes, path, handlersArr);
    return this;
  },
  /**
   * Handles put method
   * @param {Array} inputs
   * @returns {Object}
   */
  put: function (...inputs) {
    const { path, handlers } = routeMethodInputsHandler(inputs)
    // simplify the input handlers in simple Array
    const handlersArr = handlersSimplifierInArr(handlers);
    handlerAssigner("PUT", this._allRoutes, path, handlersArr);
    return this;
  },
  /**
   * Handles patch method
   * @param {Array} inputs
   * @returns {Object}
   */
  patch: function (...inputs) {
    const { path, handlers } = routeMethodInputsHandler(inputs)
    // simplify the input handlers in simple Array
    const handlersArr = handlersSimplifierInArr(handlers);
    handlerAssigner("PATCH", this._allRoutes, path, handlersArr);
    return this;
  },
  /**
   * Handles delete method
   * @param {Array} inputs
   * @returns {Object}
   */
  delete: function (...inputs) {
    const { path, handlers } = routeMethodInputsHandler(inputs)
    // simplify the input handlers in simple Array
    const handlersArr = handlersSimplifierInArr(handlers);
    handlerAssigner("DELETE", this._allRoutes, path, handlersArr);
    return this;
  },
  /**
   * app.all(), used to load middleware functions at a path for all HTTP request methods. 
   * For example, the following handler is executed for requests to the route “/secret” 
   * whether using GET, POST, PUT, DELETE, or any other HTTP request method supported in the app.METHOD.
   * @param {Array} inputs
   * @returns {Object}
   */
  all: function (...inputs) {
    const { path, handlers } = routeMethodInputsHandler(inputs)
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
