const express = require('express')
const app = express();
const mongoose = require('mongoose')
const routes = require('./Routes/authen');
const postroutes = require('./Routes/postR');
const userroutes = require('./Routes/users')

const PORT = 9000
mongoose.connect('mongodb://localhost:27017/Server').then(console.log("MongoDB connected")).catch(e=>console.log(e))

app.use(express.json())
app.use(routes)
app.use(postroutes)
app.use(userroutes)

app.listen(PORT,()=>{
    console.log("Server started...")
})