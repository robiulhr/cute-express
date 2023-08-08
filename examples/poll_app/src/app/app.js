// import  cuteExpress
const cuteExpress = require("../../../../index");
const app = cuteExpress();

// parse application/x-www-form-urlencoded
app.use(cuteExpress.urlencoded());

// parse application/json
app.use(cuteExpress.json());

app.use(bodyParser.row({ type: 'text/html' }))
app.use((req, res, next) => {
  console.log(req.body, req.params, "from global middleware");
  next()
});

/**
 *  body parsers can be used as route specific middleware also
 */
// create application/json parser
// var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded();

app.post(
  "/test",
  (req, res, next) => {
    console.log(req.body, "req.body");
    next();
  },
  (req, res) => {
    res.status(201).json({ data: req.body });
  }
);

// polls router
const polls = require("../routers/polls");
app.use("/polls", polls);

// create router
const creatRouter = require("../routers/creat");
app.use("/", creatRouter);

// edit router
const edit = require("../routers/edit");
app.use("/edit", edit);

// delete router
const deletePoll = require("../routers/delete");
app.use("/delete", deletePoll);
// controllers
const homeGetController = require("../controllers/homeGetController");
const notFoundController = require("../controllers/notFoundController");
// handling get requests
app.get("/", homeGetController);
app.get("*", notFoundController);

module.exports = app;
