const app = require("./app/app");
const route = require("./route/Route");
const middleware = require("./middleware/Middleware");
const Router = require("./router/Router");

const tinyExpress = function () {
  const AllMethodsAndobjs = { ...app, ...route, ...middleware };
  // adding all methods and objects in tinyExpress
  for (let ele in AllMethodsAndobjs) {
    app.handleRequest[ele] = AllMethodsAndobjs[ele];
  }
  return app.handleRequest;
};

// adding Router to the tinyExpress object
tinyExpress["Router"] = Router;

module.exports = tinyExpress;
