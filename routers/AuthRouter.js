const express = require('express')
const router = express.Router()
const ApiResponse = require('../utils/ApiResponse')
const jwt = require('jsonwebtoken')
const userRouter = require('./UserRouter')

router.use((request,response,next)=>{
    const authHeader = request.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    if(token==null || token== undefined || token.length==0)
    {
        response.status(500).json(new ApiResponse(false, "Token Not Found !", null, "Token Not Provided"))
    }
    else
    {
        jwt.verify(token,process.env.TOKEN_SECRET,(err,tokendata)=>{
            if(err)
            {
                response.status(500).json(new ApiResponse(false, "Token Expire !", null, "Token Expired")) 
            }
            else
            {
                const {userid} = tokendata
                request.user = {userid}
                next()
            }
        })
    }
})
router.use("/user",userRouter)

module.exports = router