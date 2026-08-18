const express=require('express');
const app=express();

app.use("/user",(req,res,next)=>{
    console.log("Route handler 1");
    next();
},(req,res,next)=>{
    res.send("ROute Handler 2");
    next();
},(req,res)=>{
    res.send("ROute Handler 2");
})
// in this case at first it goes to route handler 1
//since there is no response it goes to next(), 'next' parameter 
//must be passed in the Route handler in order to use this parameter
//then it goes to route handler 2 and send the response to the user
//but it will still go to the ROute handler 3 as javascript goes line 
//by line, so it will go to the third router but since the response is 
//already sent to the user it wont send any response again, but since there
// is one more reponse for the same route("/user"), it gives error, not
//to the user but to the developer.....

app.listen(7777, () => {
    console.log("Server is listening on the port 7777");
});