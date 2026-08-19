const express=require('express');
const app=express();

app.get("/user",(req,res)=>{
    res.send("getting the data of user1");
})
app.get("/user/123",(req,res)=>{
    res.send("getting the data of user123");
})
//here for /user first response will be sent and for /user/123 second...
//in app.get methods there is not prefix matching....

app.listen(7777, () => {
    console.log("Server is listening on the port 7777");
});