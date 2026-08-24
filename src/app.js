const express=require('express');
const app=express();
const User=require('./models/user');
const {connectDB}=require('./config/database');
//it is unreal that you always create a user instance by hardcoding it from 
//here...But what stands more realistic is that you would get request from the 
//user and you will have to save their data which is called dynamic saving of user
//data...Now the question is how to do it??
//user will send the request in the json format from the body...and we will read the json data
//and then save it....But here is an interesting part....if you console.log(req.body)
//you will recieve the output as undefined because you javascript can directly 
//read that json data so we need a middleware for that..And exrpess provided us with
//an inbuilt middleware express.json()...you can either pass it into each and every 
//route where you want to read the data or else you do app.use(express.json()) and 
//the middleware will be applicable for each and every route....

app.use(express.json());
app.post("/signup",async (req,res)=>{
    const user=User(req.body);
    try{
        await user.save();
        res.send("Data saved successfully");
    }
    catch(err){
        res.status(400).send("Error saving the data "+err.message);
    }
})
//here we are doing basic read operations in mongoose
app.get("/feed",async (req,res)=>{
    const userEmail=req.body.emailId;
    const users=await User.find({emailId:userEmail});
    try{
        if(users.length===0){
            res.status(400).send("User not found");
        }
        else{
            res.send(users);
            console.log(users);
        }
    }
    catch(err){
        res.send(err.message);
    }
})
//here we will get all the users from the database..you can try more
//features of mongoose models from the mongoose documentations
app.get("/feedAll",async (req,res)=>{
    const users=await User.find({});
    try{
        if(users.length===0){
            res.status(400).send("No user has been added as of now");
        }
        else{
            res.send(users);
            console.log(users);
        }
    }
    catch(err){
        res.send(err.message);
    }
})
connectDB().then(()=>{
    console.log("Database connection established");
    app.listen(7777, () => {
        console.log("Server is listening on the port 7777");
    });
}).catch((err)=>{
    res.send(err.message);
});

