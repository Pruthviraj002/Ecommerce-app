import mongoose from "mongoose";
import colors from 'colors'


const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to mongodb ${con.connection.host}`);
    } catch (error) {
        console.log(`Error in mongodb connection ${error}`.bgRed.white);
    }
}

export default connectDB