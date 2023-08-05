const tinyExpress = require('../../src/tiny-express')
const app = tinyExpress()
const router = tinyExpress.Router()
const port = 4000


app.get("/",(req, res,next) => {
  console.log("hello world")
  //  next(new Error('BROKEN')) // Express will catch this on its own.
},(req, res,next) => {
  console.log("hello world")
  //  next(new Error('BROKEN')) // Express will catch this on its own.
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})