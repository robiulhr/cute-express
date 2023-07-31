const { pathAndHandlerChecker } = require("./utils");
module.exports = Router = function () {
  return {
    routerHandlers: {
      ALL: {},
      GET: {},
      POST: {},
      PUT: {},
      PATCH: {},
      DELETE: {},
    },
    /**
     * Handles Get request for router
     * @param {String} path
     * @param {Function} handler
     * @returns {void,Object}
     */
    get: function (path, handler) {
      // input validation
      pathAndHandlerChecker(path, handler);
      // path already assigned
      if (this.routerHandlers.GET[path]) {
        console.log(`This path ${path} is already in use.`);
        return;
      }
      // assign the path and handler
      this.routerHandlers.GET[path] = handler;
      return this;
    },
    /**
     * Handles Post request for router
     * @param {String} path
     * @param {Function} handler
     * @returns {void,Object}
     */
    post: function (path, handler) {
      // input validation
      pathAndHandlerChecker(path, handler);
      // path already assigned
      if (this.routerHandlers.POST[path]) {
        console.log(`This path ${path} is already in use.`);
        return;
      }
      // assign the path and handler
      this.routerHandlers.POST[path] = handler;
      return this;
    },
    /**
     * Handles Put request for router
     * @param {String} path
     * @param {Function} handler
     * @returns {void,Object}
     */
    put: function (path, handler) {
      // input validation
      pathAndHandlerChecker(path, handler);
      // path already assigned
      if (this.routerHandlers.PUT[path]) {
        console.log(`This path ${path} is already in use.`);
        return;
      }
      // assign the path and handler
      this.routerHandlers.PUT[path] = handler;
      return this;
    },
    /**
     * Handles Patch request for router
     * @param {String} path
     * @param {Function} handler
     * @returns {void,Object}
     */
    patch: function (path, handler) {
      // input validation
      pathAndHandlerChecker(path, handler);
      // path already assigned
      if (this.routerHandlers.PATCH[path]) {
        console.log(`This path ${path} is already in use.`);
        return;
      }
      // assign the path and handler
      this.routerHandlers.PATCH[path] = handler;
      return this;
    },
    /**
     * Handles Delete request for router
     * @param {String} path
     * @param {Function} handler
     * @returns {void,Object}
     */
    delete: function (path, handler) {
      // input validation
      pathAndHandlerChecker(path, handler);
      // path already assigned
      if (this.routerHandlers.DELETE[path]) {
        console.log(`This path ${path} is already in use.`);
        return;
      }
      // assign the path and handler
      this.routerHandlers.DELETE[path] = handler;
      return this;
    },
    route: function (path, handler) {},
    all: function (path, handler) {},
  };
};
