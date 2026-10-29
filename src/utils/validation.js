// const User=require('../models/user');
const validator=require('validator');
const validateSignUpData=(req)=>{
    const {firstName,lastName,emailId,password}=req.body;
    if(!firstName || !lastName){
        throw new Error("First name and last name is required");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Write a valid email");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Write a strong password");
    }
}

const validateEditField=(req)=>{
    const allowedField=["firstName","lastName","age","password","skills"];
    const isAllowed=Object.keys(req.body).every(field=>allowedField.includes(field));
    return isAllowed;
}
module.exports={validateSignUpData,validateEditField};