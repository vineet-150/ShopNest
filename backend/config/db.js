const mongoose = require('mongoose');


const connectDB =async()=>{
    try {
       const conn= await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDb Connected successfully ');

    } catch (error) {
        console.log('MongoDb connection falied:',error.message);
        process.exit(1);

    }
};

module.exports=connectDB;
