import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connection = mongoose.connect(process.env.MONGODB_URI )
        console.log("Database connected successfully!")
    } catch (error) {
        console.log("Database connection failed!");
        console.log(error?.message);
        process.exit(1);
    }
}

export default connectDB;