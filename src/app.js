const express=require('express');
const app=express();

app.use("/user",(req,res)=>{
    res.send("blablabla");
})
//order matters my friend in javascript...since now you are using app.use so it will
//be accountable for all the methods....
app.get("/user",(req,res)=>{
    res.send("Getting user data");
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
app.listen(3000, () => {
    console.log("Server is listening on the port 3000");
});