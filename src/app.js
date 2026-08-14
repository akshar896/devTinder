const express=require('express');
const app=express();
app.use((req,res)=>{
    res.send("Hello from the server bro");
});
app.listen(3000, () => {
    console.log("Server is listening on the port 3000");
});