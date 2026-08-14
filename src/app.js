const express=require('express');
const app=express();
app.use("/hello",(req,res)=>{
    res.send("Hello from the hello server bro");
});
app.use("/test",(req,res)=>{
    res.send("Hello from the test server bro");
});
app.listen(3000, () => {
    console.log("Server is listening on the port 3000");
});