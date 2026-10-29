const express=require('express');
const authRouter=express.Router();
const {validateSignUpData}=require('../utils/validation');
const bcrypt=require('bcrypt');
const cookieParser=require("cookie-parser");
const jwt = require('jsonwebtoken');
const User=require('../models/user');
const {userAuth}=require("../middlwares/auth");

authRouter.post("/signup",async (req,res)=>{
    try{
        //Validation of data
        validateSignUpData(req);

        const {firstName,lastName,emailId,password}=req.body;
        //Encrypt the password
        const passwordHash=await bcrypt.hash(password,10);
        console.log(passwordHash);
        //creating a new instance of the user
        const user=new User({
            firstName,lastName,emailId,password:passwordHash
        })
        await user.save();
        res.send("User saved successfully");
    }
    catch(err){
        res.status(400).send("Error:"+err.message);
    }
})

authRouter.post("/login",async (req,res)=>{
    try{
        //first validate the email
        const {emailId,password}=req.body;
        const user=await User.findOne({emailId});
        if(!user){
            throw new Error("Email id doesn't exists");
        }
        //then compare the password and hash password
        const isPasswordValid=await user.validatePassword(password);
        if(isPasswordValid){
            const token=await user.getJwt();
            const cookie=res.cookie("token",token,{maxAge: 10 * 1000});
            res.send("Logged in successfully");
        }
        else{
            throw new Error("Invalid password");
        }
    }
    catch(err){
        res.status(400).send("Error:"+err.message);
    }
})

module.exports={
    authRouter
}