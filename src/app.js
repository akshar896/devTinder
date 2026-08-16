const express=require('express');
const app=express();

app.get("/user",(req,res)=>{
    res.send("Getting user data");
})


app.get("/user/akshar",(req,res)=>{
    res.send("Getting user data for akshar");
})

app.post("/user",(req,res)=>{
    res.send("User data successfully saved");
})

app.delete("/user",(req,res)=>{
    res.send("user data deleted successfully");
})

app.use("/",(req,res)=>{
    res.send("Just /")
})
app.listen(7777, () => {
    console.log("Server is listening on the port 7777");
});