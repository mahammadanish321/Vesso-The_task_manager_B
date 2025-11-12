import mongoose from 'mongoose';
import { DB_NAME } from "../constants.js"



const connectDB =async ()=>{
    try {
        const conectionINstionce = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`mongoDB connect succesfully,${conectionINstionce.connection.host}`);
    } catch (error) {
        console.log("mongoDB connection error",error);
        process.exit(1)
    }
}

export default connectDB;
