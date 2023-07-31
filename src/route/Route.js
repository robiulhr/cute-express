const { methodHandler } = require("./_utils");
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
    methodHandler("GET", this._allRoutes, path, handlers);
    return this;
  },
  /**
   * Handles post method
   * @param {String} path
   * @param  {...Function} handlers
   * @returns {Object}
   */
  post: function (path, ...handlers) {
    methodHandler("POST", this._allRoutes, path, handlers);
    return this;
  },
  /**
   * Handles put method
   * @param {String} path
   * @param  {...Function} handlers
   * @returns {Object}
   */
  put: function (path, ...handlers) {
    methodHandler("PUT", this._allRoutes, path, handlers);
    return this;
  },
  /**
   * Handles patch method
   * @param {String} path
   * @param  {...Function} handlers
   * @returns {Object}
   */
  patch: function (path, ...handlers) {
    methodHandler("PATCH", this._allRoutes, path, handlers);
    return this;
  },
  /**
   * Handles delete method
   * @param {String} path
   * @param  {...Function} handlers
   * @returns {Object}
   */
  delete: function (path, ...handlers) {
    methodHandler("DELETE", this._allRoutes, path, handlers);
    return this;
  },
  all: function () {},
  route: function () {},
};
