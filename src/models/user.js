const mongoose=require('mongoose');
const {Schema}=mongoose;
const userSchema=new Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
        trim:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
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
    skills:{
        type:Array,
    },
    city:{
        type:String,
        maxLength:20,
    }
},{
    timestamps:true,
});
// after adding timestamps it saves user create time and update time
const userModel=mongoose.model("User",userSchema);
module.exports=userModel;