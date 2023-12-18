const express = require('express')
const dotenv = require('dotenv')
// const fileUpload = require('express-fileupload')
const server = express()
const webRouter = require('./routers/WebRouter')

dotenv.config();

// server.use(express.urlencoded())
server.use(express.json())
// server.use(fileUpload())

server.get("/",(request,response)=>{
    response.send("Hello")
})
server.use("/web",webRouter)

server.listen(process.env.PORT,()=>{
    console.log(`Server Started http://localhost:${process.env.PORT}`)
})