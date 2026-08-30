const mongoose=require('mongoose');
const {Schema}=mongoose;
const userSchema=new Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
        trim:true,
    },
    password:{
        type:String,
    },
    age:{
        type:Number,
        min:18,
        validate(value){
            if(value>100){
                throw new Error("Please rest, dont use devTinder");
            }
        }
    },
    about:{
        type:String,
        default:"Heyy I am a JavaScript developer",
    },
    gender:{
        type:String,
        validate(value){
            const arr=["Male","Female","male","female","Others","others"];
            if(!(arr.includes(value))){
                throw new Error("Gender type not supported");
            }
        }
    },
    city:{
        type:String,
        maxLength:20,
    }
});

const userModel=mongoose.model("User",userSchema);
module.exports=userModel;