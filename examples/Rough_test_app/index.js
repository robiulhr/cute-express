const express = require('../../src/tiny-express')
const app = express()
const router = express.Router()
const port = 4000


const cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

const cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

app.get('/', [cb0, cb1], (req, res, next) => {
  console.log('the response will be sent by the next function ...')
  next()
}, (req, res) => {
  res.send('Hello from D!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})