const app = require("./app/app");
const route = require("./route/Route");
const middleware = require("./middleware/Middleware");
const Router = require("./router/Router");
const bodyParser = require('./build-in middlewares/bodyParser');

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
// adding body parser methods to the tinyExpress object
for (let elements in bodyParser) {
  tinyExpress[elements] = bodyParser[elements]
}

module.exports = tinyExpress;
