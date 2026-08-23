const mongoose=require('mongoose');
const uri="mongodb+srv://aksharpathak896_db_user:2t3GuR3zgUlZcPQG@cluster0.xc2fakf.mongodb.net/devTinder"
const connectDB=async ()=>{
    await mongoose.connect(uri);
}
module.exports={
    connectDB,
}