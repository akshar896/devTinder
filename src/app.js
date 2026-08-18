const express=require('express');
const app=express();

app.use("/user",(req,res,next)=>{
    console.log("Route handler 1");
    next();
    res.send("Route Handler 1")
},(req,res,next)=>{
    res.send("ROute Handler 2");
})
//now it will return Route handler 2...and the reason you know...
//1:it goes to the RH1...(route handler 1)
//As Javscript goes line by line...it goes to the next router using next() function
//then it sends ROute hadnler 2 as the response...but since RH1 is not completed yee
//it tries to res.send(Router handler 1) and gives the error to the developer side...


app.listen(7777, () => {
    console.log("Server is listening on the port 7777");
});