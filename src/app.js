const express=require('express');
const app=express();
app.use("/",(req,res)=>{
    res.send("Just /")
})
app.use("/hello",(req,res)=>{
    res.send("Hello hello hello");
});
app.use("/test",(req,res)=>{
    res.send("test test test");
});
app.listen(3000, () => {
    console.log("Server is listening on the port 3000");
});