const express=require('express');
const app=express();

app.use("/user",(req,res)=>{
    res.send("User data sent");
})
app.use("/user/123",(req,res)=>{
    res.send("User123 data sent");
})
//here user data sent will be outputted because /user matches the prefix of
//url /user/123....Hence this will be called for all the url's matching the 
//prefix /user...this is how routing in exrpess works...so we can use app.use
//as a middleware because every url matching the /user will first go to this 
//app.use("/user")..hence we can put whatever conditions we want like auth...

app.listen(7777, () => {
    console.log("Server is listening on the port 7777");
});