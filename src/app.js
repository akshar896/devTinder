const express=require('express');
const app=express();
const {connectDB}=require('./config/database');
connectDB().then(()=>{
    console.log("Database connection established");
    app.listen(7777, () => {
        console.log("Server is listening on the port 7777");
    });
});
