const {userAuth}=require("../middlwares/auth");
const User=require('../models/user');
const express=require('express');
const requestRouter=express.Router(); 
const ConnectionRequest=require('../models/connectionRequest');
requestRouter.post("/request/send/:status/:toUserId",userAuth,async (req,res)=>{
    try{
        const fromUserId=req.user._id;
        const toUserId=req.params.toUserId;
        const status=req.params.status;
        console.log(fromUserId);
        const allowedStatus=["ignored","interested"];
        console.log("1st");
        if(!allowedStatus.includes(status)){
            return res
          .status(400)
          .json({ message: "Invalid status type: " + status });
        }
        console.log("2nd");
        const toUser=await User.findById(toUserId);
        if(!toUser){
            return res.status(404).json({message:"User not found!"});
        }
        console.log("3rd");
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
              { fromUserId, toUserId },
              { fromUserId: toUserId, toUserId: fromUserId },
            ],
          });
          if (existingConnectionRequest) {
            return res
              .status(400)
              .send({ message: "Connection Request Already Exists!!" });
          }
          console.log("4th");
        const connectionRequest=new ConnectionRequest({
            fromUserId:fromUserId,
            toUserId:toUserId,
            status:status,
        })
        const data=await connectionRequest.save();
        res.json({
            message:
              req.user.firstName + " is " + status + " in " + toUser.firstName,
            data,
        });
    }
    catch(err){
        res.status(400).send("ERROR: " + err.message+" request.js");
    }
    
})

module.exports={
    requestRouter,
}