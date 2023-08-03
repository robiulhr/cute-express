const { handlerAssigner } = require("../globalService/globalService");

/**
 * app.route() and router.route() method handler prototype 
 * @param {String} path 
 * @param {Object} allRoutes
 * @returns {Object}
 */
const routeMethodPrototype = function (path, allRoutes) {
    return {
        path,
        allRoutes,
        /**
          * Handles get method
          * @param  {...Function} handlers
          * @returns {Object}
          */
        get: function (...handlers) {
            handlerAssigner("GET", this.allRoutes, this.path, handlers);
            return this;
        },
        /**
         * Handles post method
         * @param  {...Function} handlers
         * @returns {Object}
         */
        post: function (...handlers) {
            handlerAssigner("POST", this.allRoutes, this.path, handlers);
            return this;
        },
        /**
         * Handles put method
         * @param  {...Function} handlers
         * @returns {Object}
         */
        put: function (...handlers) {
            handlerAssigner("PUT", this.allRoutes, this.path, handlers);
            return this;
        },
        /**
         * Handles patch method
         * @param  {...Function} handlers
         * @returns {Object}
         */
        patch: function (...handlers) {
            handlerAssigner("PATCH", this.allRoutes, this.path, handlers);
            return this;
        },
        /**
         * Handles delete method
         * @param  {...Function} handlers
         * @returns {Object}
         */
        delete: function (...handlers) {
            handlerAssigner("DELETE", this.allRoutes, this.path, handlers);
            return this;
        },
        /**
         * app.all(), used to load middleware functions at a path for all HTTP request methods. 
         * For example, the following handler is executed for requests to the route “/secret” 
         * whether using GET, POST, PUT, DELETE, or any other HTTP request method supported in the app.METHOD.
         * @param  {...Function} handlers 
         * @returns {Object}
         */
        all: function (...handlers) {
            // puting the handler to all type of method handlers
            handlerAssigner("GET", this.allRoutes, this.path, handlers);
            handlerAssigner("POST", this.allRoutes, this.path, handlers);
            handlerAssigner("PUT", this.allRoutes, this.path, handlers);
            handlerAssigner("PATCH", this.allRoutes, this.path, handlers);
            handlerAssigner("DELETE", this.allRoutes, this.path, handlers);
            return this;
        },
    }
}

module.exports = {
    routeMethodPrototype
}