const { isFunction } = require("../globalUtils/globalUtils");
const defaultHandler = function (req, res) {
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found");
};

const methodHandler = function (methodType, allRouteObj, path, handlers) {
  if (typeof path !== "string") {
    console.log("please, provide a valid path");
    return;
  }
  if (handlers.length < 1) {
    console.log("please, provide a handler.");
    return;
  } else if (handlers.length === 1) {
    if (!isFunction(handlers[0])) {
      console.log("please, provide a valid function as handler");
      return;
    }
    allRouteObj[methodType][path] = handlers[0];
  } else {
    allRouteObj[methodType][path] = [];
    handlers.forEach((ele) => {
      if (!isFunction(ele)) {
        console.log("please, provide a valid function as handler");
        return;
      }
      allRouteObj[methodType][path].push(ele);
    });
  }
};

module.exports = {
  defaultHandler,
  methodHandler,
};
