const express = require('express');
const router = express.Router();
const { User } = require('../models/index')
const ApiResponse = require('../utils/ApiResponse')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')
const path = require('path')

//name,email,password,phone,image
router.post("/user_reg", async (request, response) => {
    try {
        if (request.files == undefined ||request.files.image == null || request.files.image == undefined) 
        {
            response.status(500).json(new ApiResponse(false, "User image not uploaded !", null, null))
        }
        else
        {
            const uploadFile = request.files.image;
            if (uploadFile.mimetype.includes('image/')) 
            {
                const name = uuidv4() + path.extname(uploadFile.name)
                console.log(name)
                const filePath = './uploads/' + name
                uploadFile.mv(filePath)
                const userData = {...request.body,image : name}
                const user = await User.create(userData)
                response.status(200).json(new ApiResponse(true, "User Saved", user, null))
            }
            else {
                response.status(500).json(new ApiResponse(false, "Image Wrong Format !", null, null))
            }
        }
    }
    catch (err) {
        response.status(500).json(new ApiResponse(false, "User Not Saved", null, err.message))
    }
})
//email,password
router.post("/login",async(request,response) =>{
    const reqData = request.body;
    try {
        const {email,password} = reqData
        const user = await User.findOne({
            where: [{email,password}]
        })
        if (user==null) {
            response.status(500).json(new ApiResponse(false,"Invalid User!"))
        }
        else {
            const token = jwt.sign({userid:user.id},process.env.TOKEN_SECRET,{expiresIn:"30m"})
            response.status(200).json(new ApiResponse(true, "Login Successfull !", {token}, null))
        }
    }
    catch (err) {
        response.status(500).json(new ApiResponse(false,"Login Failed !",null,err.message))
    }
})
module.exports = router;