const http = require("http");
const Routes = require("../route/Route");
const globalMiddlewares = require("../middleware/Middleware");
const Response = require("../response/Response");
const Request = require("../request/Request");
const {
  selectRouteHandler,
  callRouteHandlerAndMiddlewares,
} = require("./_utils");
const { checkWholePossitiveNumber } = require("../globalUtils/globalUtils");

/**
 * Supporting function handler for the server and implementing the next() functionality.
 * @param {Object} req
 * @param {Object} res
 */
const handleRequest = function (req, res) {
  const methodName = req.method.toUpperCase();
  // handle unsupported http method type
  if (!Routes._allSupportedMethods[methodName]) {
    res.end(`Tiny Express Doesn't Support ${methodName} http method type`)
    return
  }
  const reqUrl = req.url;
  const resObject = Object.assign(res, Response);
  const reqObject = Object.assign(req, Request);
  // selecting appropriete houteHandler
  const routeHandlerAndMiddlewares = selectRouteHandler(
    Routes,
    methodName,
    reqUrl,
    reqObject
  );
  // put all global and route specific middlewares and route handler in array
  const allRouteHandlersAndMiddlewares = [...globalMiddlewares._allGlobalMiddlewares, ...routeHandlerAndMiddlewares]
  // calls all global and route specific middlewares and route handler depending on next call
  callRouteHandlerAndMiddlewares(
    allRouteHandlersAndMiddlewares,
    reqObject,
    resObject
  );

};

/**
 *
 * @param {Number} port
 * @param {String} host
 * @param {Function} handler
 */
const listen = function (port, host, handler) {
  // arguments validation
  if (!checkWholePossitiveNumber(port)) {
    console.log("provide a valid port number.");
    return;
  }
  http.createServer(handleRequest).listen(port, host, handler);
};

module.exports = {
  handleRequest,
  listen,
};
