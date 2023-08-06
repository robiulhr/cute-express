const app = require("./app/app");
const route = require("./route/Route");
const middleware = require("./middleware/Middleware");
const Router = require("./router/Router");
const bodyParser = require('./build-in middlewares/bodyParser');

const cuteExpress = function () {
  const AllMethodsAndobjs = { ...app, ...route, ...middleware };
  // adding all methods and objects in cuteExpress
  for (let ele in AllMethodsAndobjs) {
    app.handleRequest[ele] = AllMethodsAndobjs[ele];
  }
  return app.handleRequest;
};

// adding Router to the cuteExpress object
cuteExpress["Router"] = Router;
// adding body parser methods to the cuteExpress object
for (let elements in bodyParser) {
  cuteExpress[elements] = bodyParser[elements]
}

module.exports = cuteExpress;
