const express = require('express')
const router = express.Router()
const {User,Message} = require('../models/index')
const ApiResponse = require('../utils/ApiResponse')
const { Op } = require("sequelize");

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
//senderid,msg,msg_date,receiverid
router.post("/msg",async(request,response)=>{
    const date = new Date();
    try {
        const msgData = request.body
        const {msg,receiver} = msgData
        const msgdata = {msg,sender:request.user.userid,msg_date:date,receiver}
        const data = await Message.create(msgdata)
        response.status(200).json(new ApiResponse(true, "Message Saved", data, null))
    }
    catch (err) {
        response.status(500).json(new ApiResponse(false, "Message Not Saved", null, err.message))
    }

})
router.get("/msg/:id",async(request,response)=>{
    const id = request.params.id
    try
    {
        const msg_list = await Message.findAll({
            where:{},
            attributes:{
                exclude:["createdAt","updatedAt"]
            }
        });
        response.status(200).json(new ApiResponse(true,"Message List!",user_list,null))
    }
    catch(err)
    {
        response.status(500).json(new ApiResponse(false,"Message List Not Found !",null,err.message))
    }
})
router.get("/users",async(request,response)=>{
    try
    {
        const user_list = await User.findAll({
            where:{id:{[Op.ne]:request.user.userid}},
            attributes:{
                exclude:["createdAt","updatedAt"]
            }
        });
        response.status(200).json(new ApiResponse(true,"Users List!",user_list,null))
    }
    catch(err)
    {
        response.status(500).json(new ApiResponse(false,"users List Not Found !",null,err.message))
    }
})
module.exports = router