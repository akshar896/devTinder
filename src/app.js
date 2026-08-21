const express=require('express');
const app=express();

const {auth}=require('./middlwares/auth')
//now we will see the use of middlewares in auth

app.get("/user/profile/data",auth,(req,res)=>{
    res.send("Getting the user profile data");
})
//this is the another way of using middlewares...
//one more clean way is to use other file to create the middlewares
//and from there import it....

app.listen(7777, () => {
    console.log("Server is listening on the port 7777");
});