// import  tinyExpress
const tinyExpress = require("../../src/tiny-express");
const app = tinyExpress();
// import custom bodyPareser
const bodyParser = require("../../src/build-in middlewares/bodyParser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());


// parse application/json
app.use(bodyParser.json());


app.use((req,res,next)=>{
  console.log(req.body,'from global middleware')
})

// body parsers can be used as route specific middleware also
// create application/json parser
// var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded();

app.post(
  "/test",
  (req, res, next) => {
    console.log(req.body,"req.body")
    next();
  },
  (req, res) => {
    res.status(201).json({data:req.body});
  }
);

// router
const creatRouter = require("../routers/creat");
app.use("/", creatRouter);
// controllers
const homeGetController = require("../controllers/homeGetController");
const notFoundController = require("../controllers/notFoundController");
// handling get requests
app.get("/", homeGetController);
app.get("*", notFoundController);

module.exports = app;
