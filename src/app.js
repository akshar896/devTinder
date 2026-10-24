const express=require('express');
const app=express();
const User=require('./models/user');
const {connectDB}=require('./config/database');
const {validateSignUpData}=require('./utils/validation');
const bcrypt=require('bcrypt');
const cookieParser=require("cookie-parser");
const jwt = require('jsonwebtoken');
const {userAuth}=require("./middlwares/auth");
app.use(express.json());
app.use(cookieParser());//middleware for getting the cookies from req
app.post("/test",(req,res)=>{
    res.send("Everything is fine");
})
app.post("/signup",async (req,res)=>{
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

app.post("/login",async (req,res)=>{
    try{
        //first validate the email
        const {emailId,password}=req.body;
        const user=await User.findOne({emailId});
        if(!user){
            throw new Error("Email id doesn't exists");
        }
        //then compare the password and hash password
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(isPasswordValid){
            const token=await jwt.sign({_id:user._id},"DEV@Tinder$790")
            const cookie=res.cookie("token",token);
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

app.get("/profile",userAuth,async (req,res)=>{
    const user=req.user;
    res.send(user);
})

app.post("/sendConnectionRequest",userAuth,async (req,res)=>{
    const toWhom=req.body.emailId;
    const user=req.user;
    const otherUser=await User.findOne({emailId:toWhom});
    res.send(user.firstName+" "+user.lastName+" sent connection request to "+otherUser.firstName+" "+otherUser.lastName);
})
connectDB().then(()=>{
    console.log("Database connection established");
    app.listen(7989, () => {
        console.log("Server is listening on the port 7989");
    });
}).catch((err)=>{
    res.send(err.message);
});
//Write userAuth middleware
// Add the userAuth middleware in /profile and a new /sendConnectionRequest api