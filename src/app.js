const express=require('express');
const app=express();
const User=require('./models/user');
const {connectDB}=require('./config/database');

app.use(express.json());
app.post("/signup",async (req,res)=>{
    const user=User(req.body);
    try{
        await user.save();
        res.send("User added successfully");
    }
    catch(err){
        res.status(400).send("Error saving the data "+err.message);
    }
})

app.patch("/update/user",async (req,res)=>{
    const userId = req.body.userId;
    const data=req.body
    try{
        await User.findByIdAndUpdate({_id:userId},data);
        res.send("User updated successfully");
    }
    catch(err){
        res.status(400).send("Error saving the data "+err.message);
    }
})
//another method of updating user
connectDB().then(()=>{
    console.log("Database connection established");
    app.listen(7777, () => {
        console.log("Server is listening on the port 7777");
    });
}).catch((err)=>{
    res.send(err.message);
});

