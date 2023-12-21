const express = require('express')
const dotenv = require('dotenv')
const webRouter = require('./routers/WebRouter')
const authRouter = require('./routers/AuthRouter')
const fileUpload = require('express-fileupload')

dotenv.config();
const server = express()
server.use(express.urlencoded())
server.use(express.json())
server.use(fileUpload())

server.get("/",(request,response)=>{
    response.send("Hello")
})
server.use("/web",webRouter)
server.use("/auth",authRouter)

server.listen(process.env.PORT,()=>{
    console.log(`Server Started http://localhost:${process.env.PORT}`)
})