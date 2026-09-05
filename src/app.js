const express=require('express');
const app=express();
const User=require('./models/user');
const {connectDB}=require('./config/database');
const {validateSignUpData}=require('./utils/validation');
const bcrypt=require('bcrypt');
app.use(express.json());
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

app.patch("/update/:userId/",async (req,res)=>{
    const userId = req.params?.userId;
    const data=req.body;
    try{
        const allowedUpdates=["gender","age","skills","about"];
        const isAllowedUpdates=Object.keys(data).every((k)=>allowedUpdates.includes(k));
        if(!isAllowedUpdates){
            throw new Error("Update not allowed");
        }
        if(data?.skills.length>10){
            throw new Error("Skills can't me more than 10");
        }
        await User.findByIdAndUpdate({_id:userId},data,{runValidators:true});
        res.send("User updated successfully");
    }
    catch(err){
        res.status(400).send("Error saving the data "+err.message);
    }
})
// // In this section, we are using validators to make our schema more robust.

// Note:
// When signing up a new user, validators are automatically applied
// when user.save() is called.
//
// However, when updating an existing user using methods like
// findByIdAndUpdate(), Mongoose does not run validators by default.
//
// Therefore, we need to explicitly pass { runValidators: true }
// if we want schema validators to run during the update as well.

connectDB().then(()=>{
    console.log("Database connection established");
    app.listen(7777, () => {
        console.log("Server is listening on the port 7777");
    });
}).catch((err)=>{
    res.send(err.message);
});

//doing api level validation, like what are users allowed to update in fields