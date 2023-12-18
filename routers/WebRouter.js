const express = require('express');
const router = express.Router();
const {User} = require('../models/index')
const ApiResponse = require('../utils/ApiResponse')

//name,email,password,phone
router.post("/user_reg",async(request,response)=>{
    try
    {
        const userData = request.body
    const user = await User.create(userData)
    response.status(200).json(new ApiResponse(true,"User Saved",user,null))
    }
    catch(err)
    {
        response.status(200).json(new ApiResponse(false,"User Not Saved",null,err.message))
    }
})
module.exports = router;