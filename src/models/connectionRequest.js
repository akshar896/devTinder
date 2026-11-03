const mongoose=require('mongoose');
const connectionRequestSchema=mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:'{VALUE} is incorrect status type',
        },
    },
},
{timestamps:true});

connectionRequestSchema.index({fromUserId:1,toUserId:1});//this is indexing
//which is used to fasten the search query in db

//Kisi particular database operation ke execute hone se PEHLE 
// agar tujhe koi kaam karwana hai, toh Schema.pre() use karte hain 

connectionRequestSchema.pre("save",function(){
    connectionRequest=this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send connection request to yourself!");
    }});

const connectionRequestModel=mongoose.model("ConnectionRequest",connectionRequestSchema);
module.exports=connectionRequestModel