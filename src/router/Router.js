const { handlerAssigner } = require("../globalService/globalService");

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
      handlerAssigner("GET", this.routerHandlers, path, handlers);
      return this;
    },
    /**
     * Handles Post request for router
     * @param {String} path
     * @param {Array} handlers
     * @returns {void,Object}
     */
    post: function (path, ...handlers) {
      handlerAssigner("POST", this.routerHandlers, path, handlers);
      return this;
    },
    /**
     * Handles Put request for router
     * @param {String} path
     * @param {Array} handlers
     * @returns {void,Object}
     */
    put: function (path, ...handlers) {
      handlerAssigner("PUT", this.routerHandlers, path, handlers);
      return this;
    },
    /**
     * Handles Patch request for router
     * @param {String} path
     * @param {Array} handlers
     * @returns {void,Object}
     */
    patch: function (path, handlers) {
      handlerAssigner("PATCH", this.routerHandlers, path, handlers);
      return this;
    },
    /**
     * Handles Delete request for router
     * @param {String} path
     * @param {Array} handlers
     * @returns {void,Object}
     */
    delete: function (path, ...handlers) {
      handlerAssigner("DELETE", this.routerHandlers, path, handlers);
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
      // puting the handler to all type of method handlers
      handlerAssigner("GET", this.routerHandlers, path, handlers);
      handlerAssigner("POST", this.routerHandlers, path, handlers);
      handlerAssigner("PUT", this.routerHandlers, path, handlers);
      handlerAssigner("PATCH", this.routerHandlers, path, handlers);
      handlerAssigner("DELETE", this.routerHandlers, path, handlers);
      return this;
    }
  };
};
