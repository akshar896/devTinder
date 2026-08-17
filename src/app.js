const express=require('express');
const app=express();
//query (when we are give some query in the request url, we can
// access it through req.query)
app.get("/user",(req,res)=>{
    console.log(req.query);
    res.send({
        firstName:"Akshar",
        lastName:"Pathak",
    })
})
//param ,(When we have to do dynamic routing coz if there are 1 lakh users
// in your application you wont add each name to your routes,so we make 
// a dynamic route in that case by putting ":" sign)
app.get("/user/:userId/:password",(req,res)=>{
    console.log(req.params);
    res.send({
        firstName:"Akshar",
        lastName:"Pathak",
    })
})

app.listen(7777, () => {
    console.log("Server is listening on the port 7777");
});