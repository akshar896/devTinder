const express=require('express');
const app=express();

//now we will see the use of middlewares in auth
const auth =(req,res,next)=>{
    const token="abcx";
    const authToken="abc";
    if(token===authToken){
        next();
    }
    else{
        res.status(401).send("Unauthorised access");
    }
}
app.get("/user/profile/data",auth,(req,res)=>{
    res.send("Getting the user profile data");
})
//this is the another way of using middlewares...
//one more clean way is to use other file to create the middlewares
//and from there import it....

app.listen(7777, () => {
    console.log("Server is listening on the port 7777");
});