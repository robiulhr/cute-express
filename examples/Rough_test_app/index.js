const cuteExpress = require('../../src/cute-express')
const app = cuteExpress()
const router = cuteExpress.Router()
const port = 4000


app.get("/",(req, res,next) => {
  console.log("hello world")
  //  next(new Error('BROKEN')) // Cute Express will catch this on its own.
},(req, res,next) => {
  console.log("hello world")
  //  next(new Error('BROKEN')) // Cute Express will catch this on its own.
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})