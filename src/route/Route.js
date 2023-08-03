const { routeMethodPrototype } = require('./service')
const { handlerAssigner } = require("../globalService/globalService");
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
    handlerAssigner("GET", this._allRoutes, path, handlers);
    return this;
  },
  /**
   * Handles post method
   * @param {String} path
   * @param  {...Function} handlers
   * @returns {Object}
   */
  post: function (path, ...handlers) {
    handlerAssigner("POST", this._allRoutes, path, handlers);
    return this;
  },
  /**
   * Handles put method
   * @param {String} path
   * @param  {...Function} handlers
   * @returns {Object}
   */
  put: function (path, ...handlers) {
    handlerAssigner("PUT", this._allRoutes, path, handlers);
    return this;
  },
  /**
   * Handles patch method
   * @param {String} path
   * @param  {...Function} handlers
   * @returns {Object}
   */
  patch: function (path, ...handlers) {
    handlerAssigner("PATCH", this._allRoutes, path, handlers);
    return this;
  },
  /**
   * Handles delete method
   * @param {String} path
   * @param  {...Function} handlers
   * @returns {Object}
   */
  delete: function (path, ...handlers) {
    handlerAssigner("DELETE", this._allRoutes, path, handlers);
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
    // puting the handler to all type of method handlers
    handlerAssigner("GET", this._allRoutes, path, handlers);
    handlerAssigner("POST", this._allRoutes, path, handlers);
    handlerAssigner("PUT", this._allRoutes, path, handlers);
    handlerAssigner("PATCH", this._allRoutes, path, handlers);
    handlerAssigner("DELETE", this._allRoutes, path, handlers);
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
