const express = require('../../src/tiny-express')
const app = express()
const port = 4000

// home page get request
app.get('/', (req, res,next) => {
    console.log('Hello world from app.get handler of / page')
    next()
})

app.all('/',(req,res)=>{
    res.send('Hello world from app.all handler of / page')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})