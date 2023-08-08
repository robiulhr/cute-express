const cuteExpress = require('../../index')
const app = cuteExpress()
const router = cuteExpress.Router()
const port = 4000

// A simple middleware
app.use((req, res, next) => {
  console.log('A request is coming in...');
  next(); // Don't forget to call next to continue the flow
});

app.get("/",(req, res,next) => {
  console.log("hello world")
  next()
},(req, res,next) => {
  console.log("hello world")
  res.send("hello world")
  //  next(new Error('BROKEN')) // Cute Express will catch this on its own.
})




app.get("/ab/cd", (req, res) => {
  res.send("ab?cd");
});

app.get("/ab?cd", (req, res) => {
  res.send("ab?cd");
});

app.get("/ab(cd)?e", (req, res) => {
  res.send("ab(cd)?e");
});

app.get(/a/, (req, res) => {
  res.send("/a/");
});

app.get(/\/product\/(\d+)/, (req, res) => {
  const productUrl = req.url;
  res.send(`Product ID: ${productUrl.split("/")[2]}`); 
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})