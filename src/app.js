const express=require('express');
const app=express();

//now we will see the use of middlewares in auth
app.use("/user/profile",(req,res,next)=>{
    const token="xbc";
    const authToken="abc";
    if(token===authToken){
        next();
    }
    else{
        res.status(401).send("Unauthorised access");
    }
})
app.get("/user/profile",(req,res)=>{
    res.send("Getting the user profile");
})
//app.use can be considered as an inbuilt middleware😂
//coz it will always authenticate any route with prefix /user/profile
//unlike app.get() coz it doesn't do prefix matching

app.listen(7777, () => {
    console.log("Server is listening on the port 7777");
});