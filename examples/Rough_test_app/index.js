const express = require('../../src/tiny-express')
const app = express()
const router = express.Router()
const port = 4000


app.get('/random.text', (req, res) => {
  res.send('random.text')
})

app.get('/data/([\$])book', (req, res) => {
  console.log("/data/([\$])book")
  res.send(req.url)
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})