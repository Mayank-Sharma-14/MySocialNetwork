const express = require('express')
const app = express();
const mongoose = require('mongoose')
const routes = require('./Routes/authen');
const postroutes = require('./Routes/postR');
const userroutes = require('./Routes/users')

const {MONGOURI} = require("./valuekey.js")

const PORT = 9000
mongoose.connect(MONGOURI)
mongoose.connection.on("connected", ()=>{
    console.log("We are connected to server")
})
mongoose.connection.on("error", ()=>{
    console.log("We are not connected to server")
})


app.use(express.json())
app.use(routes)
app.use(postroutes)
app.use(userroutes)

app.listen(PORT,()=>{
    console.log("Server started...")
})
