const express = require('../../src/tiny-express')
const app = express()
const router = express.Router()
const port = 4000



router.get('/random.text', (req, res) => {
  res.send('random.text')
})

router.get('/da?ta', (req, res, next) => {
  console.log("/data/([\$])book")
  next()
})
app.get('/da*ta', (req, res) => {
  console.log("/data/([\$])book")
  res.send(req.url)
})

app.use("/", router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})