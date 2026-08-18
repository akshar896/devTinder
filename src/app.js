const express=require('express');
const app=express();

app.use("/user",(req,res)=>{
    console.log("Hello user");
})
//when you don't respond anything then the server goes to infite loop
//because it doesn't know what response to give to the user for this
//particular route

app.listen(7777, () => {
    console.log("Server is listening on the port 7777");
});