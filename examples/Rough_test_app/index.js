const express = require('../../src/tiny-express')
const app = express()
const router = express.Router()
const port = 4000

app.post('/', (req, res, next) => {
  console.log('Hello world from app.post handler of / page')
  next()
})


app.get('/', (req, res, next) => {
  console.log('Hello world from app.get handler of / page')
  next()
})

router.route('/').get((req, res, next) => {
  console.log("hello world from rotuer.route().get() of / page, second one")
  next()
}).post((req, res, next) => {
  console.log("hello world from rotuer.route().post() of / page, second one")
  next()
})

router.use((req, res, next) => {
  console.log("hello world from router.use for / page")
  next()
})


app.use('/', router)

app.route('/').get((req,res,next)=>{
  console.log("hello world from app.route().get() for / page")
  next()
}).post((req,res,next)=>{
  console.log("hello world from app.route().post() for / page")
  next()
})

app.post('/', (req, res, next) => {
  console.log('Hello world from app.post handler of / page')
  next()
})

app.get('/', (req, res, next) => {
  console.log('Hello world from app.get handler of / page')
  next()
})

app.all('/', (req, res) => {
  console.log('Hello world from app.all handler of / page')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})