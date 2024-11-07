const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser= require('body-parser')
const router= require('./routers')
const whitelist = ['http://localhost:5173','https://deer6.vercel.app']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('forbident by cors'))
    }
  }
}
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors(corsOptions))
app.use("/api",router)

// app.get("/",(req,res)=>{
//     res.json("hello product")
// })
app.listen(3000)