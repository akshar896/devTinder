const {userAuth}=require("../middlwares/auth");
const User=require('../models/user');
const express=require('express');
const profileRouter=express.Router();
profileRouter.get("/profile",userAuth,async (req,res)=>{
    const user=req.user;
    res.send(user);
})
module.exports={
    profileRouter,
}