const http = require("http");
const Routes = require("../route/Route");
const globalMiddlewares = require("../middleware/Middleware");
const Response = require("../response/Response");
const Request = require("../request/Request");
const {
  reqParamsHandler,
  selectRouteHandler,
  callRouteHandlerAndMiddlewares,
} = require("./_utils");
const { checkWholePossitiveNumber, isFunction } = require("../globalUtils/globalUtils");

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
  // handle req params 
  reqParamsHandler(reqUrl, reqObject)
  // selecting appropriete houteHandler
  const routeHandlerAndMiddlewares = selectRouteHandler(
    Routes,
    methodName,
    reqUrl
  );
  /**
   * creating array for the route handlers and middlewares. 
   * To avoid scenario where the route doesn't have any middleware 
   * The only route handler is available That means routeHandlerAndMiddlewares is a funciton.
   */
  let routeHandlerAndMiddlewaresArr;
  if (isFunction(routeHandlerAndMiddlewares)) routeHandlerAndMiddlewaresArr = [routeHandlerAndMiddlewares]
  else routeHandlerAndMiddlewaresArr = [...routeHandlerAndMiddlewares]
  // put all global and route specific middlewares and route handler in array
  const allRouteHandlersAndMiddlewares = [...globalMiddlewares._allGlobalMiddlewares, ...routeHandlerAndMiddlewaresArr]
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

const set = function () { };

const param = function () { };

module.exports = {
  handleRequest,
  listen,
  set,
  param,
};
