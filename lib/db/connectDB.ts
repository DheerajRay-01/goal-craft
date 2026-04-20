import mongoose from "mongoose";

type connectionObject = {
    isConnected? : number
}
const connection: connectionObject = {}

const connectDB = async ()=>{
      // Check if we have a connection to the database or if it's currently connecting
    if (connection.isConnected) {
        console.log('Already connected to the database');
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGO_URI || "")
        connection.isConnected = db.connections[0].readyState
        console.log('Database connected successfully');
    } catch (error) {
        console.log("failed To connect DB: ",error);
        process.exit(1)
    }
}

export default connectDB