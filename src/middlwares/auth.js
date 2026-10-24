const jwt=require('jsonwebtoken');
const User=require('../models/user');
const userAuth =async (req,res,next)=>{
    try{
        const {token}=req.cookies;
        const decodedMessage=jwt.verify(token,"DEV@Tinder$790")
        const {_id}=decodedMessage;
        const user=await User.findById(_id);
        if(!user || !token){
            throw new Error("Please login first to fulfil your request");
        }
        req.user=user;
        next();
    }
    catch(err){
        res.status(400).send("Error:"+err.message);
    }
}
module.exports={
    userAuth
}