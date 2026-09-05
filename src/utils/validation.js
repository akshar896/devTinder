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
module.exports={validateSignUpData};