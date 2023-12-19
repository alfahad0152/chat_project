const express = require('express')
const router = express.Router()
const {User} = require('../models/index')
const ApiResponse = require('../utils/ApiResponse')

router.put("/chg_pass",async(request,response)=>{
    const userId = request.user.userid
    const user = await User.findOne({where:{id:userId}})
    const pass = user.password
    const reqData = request.body
    const {oldPassword,newPassword} = reqData
    if(pass==oldPassword)
    {
        const passData = await User.update({password:newPassword},{where :{id:userId}})
        if(passData[0]>0)
        {
            response.status(200).json(new ApiResponse(true,"Password Updated !",null, null))
        }
        // else
        // {
        //     response.status(500).json(new ApiResponse(false, "Error !", null, null))
        // }
    }
    else
    {
        response.status(500).json(new ApiResponse(false, "Wrong Old Password !", null,null))
    }
 })

router.put("/profile_update",async(request,response)=>{
    const reqData = request.body
    const {name,phone} = reqData
    try
    {
        const data = await User.update({name,phone} ,{where:{id:request.user.userid}})
        if (data[0] > 0) 
        {
            response.status(200).json(new ApiResponse(true, "User Updated !",data, null))
        }
        else 
        {
            response.status(500).json(new ApiResponse(false, "User not found !", null, null))
        }
    }
    catch(err)
    {
        response.status(500).json(new ApiResponse(false, "User Profile not updated !", null, err.message))
    }
})
module.exports = router