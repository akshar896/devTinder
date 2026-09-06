const express=require('express');
const app=express();
const User=require('./models/user');
const {connectDB}=require('./config/database');
const {validateSignUpData}=require('./utils/validation');
const bcrypt=require('bcrypt');
app.use(express.json());
app.post("/signup",async (req,res)=>{
    try{
        //Validation of data
        validateSignUpData(req);

        const {firstName,lastName,emailId,password}=req.body;
        //Encrypt the password
        const passwordHash=await bcrypt.hash(password,10);
        console.log(passwordHash);
        //creating a new instance of the user
        const user=new User({
            firstName,lastName,emailId,password:passwordHash
        })
        await user.save();
        res.send("User saved successfully");
    }
    catch(err){
        res.status(400).send("Error:"+err.message);
    }
})

app.post("/login",async (req,res)=>{
    try{
        //first validate the email
        const {emailId,password}=req.body;
        const user=await User.findOne({emailId});
        if(!user){
            throw new Error("Email id doesn't exists");
        }
        //then compare the password and hash password
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(isPasswordValid){
            const cookie=res.cookie;
            res.send("Logged in successfully");
        }
        else{
            throw new Error("Invalid password");
        }
    }
    catch(err){
        res.status(400).send("Error:"+err.message);
    }
})
// Before learning the cookies concept first let's understand how it works behind
// the scenes....
//
// Whenever a user logs in for the first time, he sends his username and password
// to the server.
//
// Server validates the username and password and if everything is correct,
// it authenticates the user and sends a cookie to the browser.
//
// Cookie is basically stored and managed by the browser.
//
//
// Now the question is:
// How is the cookie actually sent and taken back?
//
// When the server wants to give a cookie to the browser, it sends it through
// the "Set-Cookie" response header.
//
// Browser receives that cookie and stores it.
//
// Now whenever the user sends another request to the same website/API,
// the browser automatically sends the cookie along with the request
// (provided the cookie's domain/path/security rules allow it).
//
// So basically the flow is:
//
// Login Request
//        ↓
// Server validates username + password
//        ↓
// Server sends "Set-Cookie"
//        ↓
// Browser stores the cookie
//        ↓
// User makes another API request
//        ↓
// Browser automatically sends the cookie
//        ↓
// Server reads and validates the cookie
//        ↓
// Server knows which user is making the request
//        ↓
// Server sends the response
//
//
// Now another question is:
// What is actually present inside the cookie?
//
// Usually the cookie contains some identifier/token.
//
// For example:
//
// sessionId = abc123
//
// The server can use this sessionId to identify the logged-in user.
//
// In some systems the cookie can contain a JWT token itself.
// In other systems, the cookie only contains a session ID and the actual
// user/session information is stored on the server.
//
//
// Now the main question:
// What would happen if the cookie didn't exist?
//
// Let's say you are logged in to a website which requires authentication.
//
// Accessing APIs such as getting profile data, creating something,
// updating something, etc. would also require authentication.
//
// Otherwise, what would be the point of authentication?
//
// For example, imagine a website which asks for authentication only while
// logging in, but after that anyone can directly call the profile API,
// create API, update API, etc.
//
// Then obviously authentication would be useless.
//
//
// So the question is:
// How would the server know whether the user is already logged in or not?
//
// This is where the cookie comes into the picture.
//
// Whenever the user makes a request to a protected API, the browser sends
// the cookie along with the request.
//
// Server checks the cookie/token/session ID.
//
// If it is valid and not expired, the server can identify the user and
// allow the request.
//
// If the cookie doesn't exist, is invalid, or is expired,
// the server can reject the request and ask the user to authenticate.
//
//
// Now another question:
// Why don't we just login before every API request?
//
// Suppose the user wants to access the profile API.
//
// We could theoretically send username + password again,
// but that would be extremely inefficient and insecure.
//
// Instead, after the first successful login, the server gives the browser
// some form of authentication state (usually through a cookie/session).
//
// Then the browser keeps sending that authentication information with
// subsequent requests.
//
// So the user doesn't have to send username + password again and again.
//
//
// One important correction:
//
// The router CAN handle two requests.
//
// For example:
//
// 1. POST /login
// 2. GET /profile
//
// These are two separate requests and the server handles them separately.
//
// The important thing is that after the login request,
// the server/browser has some persistent authentication state
// (for example, a session stored on the server and a session ID stored
// in the cookie).
//
// Then when the second request comes,
// the cookie tells the server which logged-in session/user this request
// belongs to.
//
// So the server doesn't need to remember the previous HTTP request itself.
//
// It only needs some authentication state that can be used to identify
// the user.
//
//
// So the complete flow is:
//
// User enters username + password
//              ↓
//        POST /login
//              ↓
// Server validates credentials
//              ↓
// Server creates session/token
//              ↓
// Server sends Set-Cookie
//              ↓
// Browser stores cookie
//              ↓
// User requests GET /profile
//              ↓
// Browser automatically sends cookie
//              ↓
// Server validates cookie/session/token
//              ↓
// Server identifies the user
//              ↓
// Server returns profile data
//
//
// This is basically how cookies help maintain authentication
// between multiple HTTP requests.

connectDB().then(()=>{
    console.log("Database connection established");
    app.listen(7777, () => {
        console.log("Server is listening on the port 7777");
    });
}).catch((err)=>{
    res.send(err.message);
});

