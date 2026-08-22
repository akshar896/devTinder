const express=require('express');
const app=express();

app.get("/user/profile/data",(req,res)=>{
    try{
        res.send("Getting user data");
    }
    catch(err){
        res.status(404).send("Something went wrong");
    }
})
//error handling basics...you should always use try and catch block
//in case of any code crash...its a good practice......

app.listen(7777, () => {
    console.log("Server is listening on the port 7777");
});