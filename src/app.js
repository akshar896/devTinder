const express=require('express');
const app=express();

//now we will see the use of middlewares in auth
app.get("/user/profile",(req,res,next)=>{
    const token="abc";
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

// now in this case the user will be authorised first before getting the data..
//This is the different way of writing routes...first one we studied in the same
//routes we keep adding more and more route handlers..but instead of that we
//can create one more same routes and it will be giving the same results

app.listen(7777, () => {
    console.log("Server is listening on the port 7777");
});