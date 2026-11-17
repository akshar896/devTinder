const {userAuth}=require("../middlwares/auth");
const ConnectionRequest=require('../models/connectionRequest');
const express=require("express");
const userRouter=express.Router();

userRouter.get("/users/requests/received",userAuth,async (req,res)=>{
    try{
        const loggedInUser=req.user;
        const connections=await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested",
        }).populate("fromUserId", "firstName lastName age gender");
        if(!connections){
            return res.status(200).json({message:"You have no connections"});
        }
        res.json({
            message: "Data fetched successfully",
            data: connections,
        });    }
    catch(err){
        res.status(400).send("ERROR: " + err.message+" request.js");
    }

})

module.exports={
    userRouter,
}