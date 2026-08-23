const { MongoClient } = require('mongodb');

const uri=
"mongodb+srv://aksharpathak896_db_user:2t3GuR3zgUlZcPQG@cluster0.xc2fakf.mongodb.net/"
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        const db=client.db('HelloWord')
        const users=client.db('HelloWord').collection('User');
        const data={
            firstName:"Deepika",
            lastName:"Padukon",
            age:37,
        }
        await users.insertMany([data]);
        const findResult=await users.find({}).toArray();
        console.log(findResult);
        console.log('MongoDB connected successfully!');
    } catch (error) {
        console.log('MongoDB connection failed:', error);
    }
}
connectDB();
console.log("Hello bro");
module.exports={
    connectDB,
}