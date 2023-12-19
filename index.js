const express = require('express')
const dotenv = require('dotenv')
const server = express()
const webRouter = require('./routers/WebRouter')
const authRouter = require('./routers/AuthRouter')

dotenv.config();

server.use(express.json())

server.get("/",(request,response)=>{
    response.send("Hello")
})
server.use("/web",webRouter)
server.use("/auth",authRouter)

server.listen(process.env.PORT,()=>{
    console.log(`Server Started http://localhost:${process.env.PORT}`)
})