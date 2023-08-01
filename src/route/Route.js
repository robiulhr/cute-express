const { handlerAssigner } = require("../globalService/globalService");
module.exports = route = {
  _allRoutes: {
    ALL: {},
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
  all: function () {},
  route: function () {},
};
