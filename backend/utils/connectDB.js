import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
const connectDB = async () =>{
    try{
        mongoose.connect(process.env.MONGO_URI).then(() => {
            console.log('MongoDB connected successfully');
        })
    }
    catch(error){
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit the process with failure
    }
}

console.log(`MongoDB URI: ${process.env.MONGO_URI}`);

export default connectDB;