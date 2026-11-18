const {userAuth}=require("../middlwares/auth");
const ConnectionRequest=require('../models/connectionRequest');
const express=require("express");
const userRouter=express.Router();
const USER_SAFE_DATA = "firstName lastName age gender";
const User=require("../models/user")
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

userRouter.get("/users/connections",userAuth,async (req,res)=>{
    try{
        const loggedInUser=req.user;
        console.log("Logged in user:", loggedInUser._id);
        const connections= await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id,status:"accepted"},
                {toUserId:loggedInUser._id,status:"accepted"},
            ]
        }).populate("fromUserId", "firstName lastName").populate("toUserId", "firstName lastName")
        if(!connections){
            return res.status(200).json({message:"You have no connections"});
        }
        const data=connections.map((row)=>{
            if(row.fromUserId._id.toString()===loggedInUser._id.toString() ){
                return row.toUserId;
            }
            return row.fromUserId;
        });
        res.json({message:"These are your connections",
            data
        })
        console.log(data);
    }
    catch(err){
        res.status(400).send("ERROR:"+ err.message+" request.js");
    }
})

userRouter.get("/feed",userAuth,async (req,res)=>{
    try{
        const loggedInUser=req.user;
        //should not see user itself in the feed
        //any accepted rejected ignored or interested must not be visible
        const connections=await ConnectionRequest.find({
            $or:[{fromUserId:loggedInUser._id},{toUserId:loggedInUser._id}]
        }).select("fromUserId toUserId")
        const hideUsersFromFeed=new Set();
        connections.forEach((req)=>{
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        })
        const users=await User.find({
            _id:{$nin:Array.from(hideUsersFromFeed)}
        })
        res.json({data:users});
    }
    catch(err){
        res.status(404).send("ERROR:"+err.message);
    }
})
module.exports={
    userRouter,
}