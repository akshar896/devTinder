const {userAuth}=require("../middlwares/auth");
const User=require('../models/user');
const express=require('express');
const requestRouter=express.Router(); 
requestRouter.post("/sendConnectionRequest",userAuth,async (req,res)=>{
    try{
        const toWhom=req.body.emailId;
        const user=req.user;
        const otherUser=await User.findOne({emailId:toWhom});
        res.send(user.firstName+" "+user.lastName+" sent connection request to "+otherUser.firstName+" "+otherUser.lastName);
    }
    catch(err){
        throw new Error("Error:"+err.message);
    }
    
})

module.exports={
    requestRouter,
}