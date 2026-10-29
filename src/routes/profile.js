const {userAuth}=require("../middlwares/auth");
const User=require('../models/user');
const express=require('express');
const profileRouter=express.Router();
const {validateEditField}=require('../utils/validation');
profileRouter.get("/profile/view",userAuth,async (req,res)=>{
    const user=req.user;
    res.send(user);
})

profileRouter.get("/profile/edit",userAuth,async (req,res)=>{
    try{
        if(!validateEditField(req)){
            throw new Error("Can not edit this field");
        }
        const loggedInUser=req.user;
        Object.keys(req.body).forEach(key=>{loggedInUser[key]=req.body[key]});
        res.json({message:'${loggedInUser.firstName} profile is updated successfully',
            data:loggedInUser
        });
        await loggedInUser.save();
    }
    catch(err){
        res.status(400).send(err.message);
    }
})

module.exports={
    profileRouter,
}