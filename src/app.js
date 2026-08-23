const express=require('express');
const app=express();
const User=require('./models/user');
const {connectDB}=require('./config/database');
app.post("/signup",async (req,res)=>{
    // You can consider 'User' model as a class and 'user' as an instance
    // of that class.
    //
    // Important:
    // devTinder is your database.
    // Inside the database, you have collections, for example, the 'users'
    // collection.
    //
    // To define the structure of a user document, you create a userSchema.
    // You can consider a Schema as a blueprint that defines what fields
    // and rules a user document should have.
    //
    // After creating the Schema, you create a Model from that Schema.
    // You can think of the Model as a class.
    //
    // Then you create instances of that Model, which are documents.
    // A document represents one actual user and contains fields such as
    // firstName, lastName, emailId, age, gender, etc.
    //Database->collections->documents->fields
    const user=new User({
        firstName:"Virat",
        lastName:"Kohli",
        age:39,
        password:"Anushka@123",
    })
    try{
        await user.save();
        res.send("Data added successfully");
    }
    catch(err){
        res.status(400).send("Error connecting database"+err.message);
    }
})
connectDB().then(()=>{
    console.log("Database connection established");
    app.listen(7777, () => {
        console.log("Server is listening on the port 7777");
    });
}).catch((err)=>{
    res.send(err.message);
});

