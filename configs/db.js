import mongoose from "mongoose";
const connectDb = async() => {
    try {
        mongoose.connect(process.env.MONGO_DB)
        console.log("Db connected");
        
    } catch (error) {
        console.log(error);      
    }
}

export default connectDb