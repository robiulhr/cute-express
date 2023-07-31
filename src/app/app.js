const http = require("http");
const Routes = require("../route/Route");
const globalMiddlewares = require("../middleware/Middleware");
const Response = require("../response/Response");
const Request = require("../request/Request");
const {
  selectRouteHandler,
  callGlobalMiddlewares,
  callRouteHandlerAndMiddlewares,
} = require("./_utils");
const { checkWholePossitiveNumber } = require("../globalUtils/globalUtils");

/**
 * Supporting function handler for the server and implementing the next() functionality.
 * @param {Object} req
 * @param {Object} res
 */
const handleRequest = function (req, res) {
  const resObject = Object.assign(res, Response);
  const reqObject = Object.assign(req, Request);
  const methodName = reqObject.method.toUpperCase();
  const reqUrl = reqObject.url;
  // calls all global middlewares depending on next call
  callGlobalMiddlewares(globalMiddlewares, reqObject, resObject);
  // selecting appropriete houteHandler
  const routeHandlerAndMiddlewares = selectRouteHandler(
    Routes,
    methodName,
    reqUrl
  );
  // calls all route specific middlewares and route handler depending on next call
  callRouteHandlerAndMiddlewares(
    routeHandlerAndMiddlewares,
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

const set = function () {};

const param = function () {};

module.exports = {
  handleRequest,
  listen,
  set,
  param,
};
