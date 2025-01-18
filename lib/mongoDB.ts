import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToMongoDB = async (): Promise<void> => {
    mongoose.set("strictQuery", true);

    if (isConnected) {
        console.log("MongoDB is connected");
        return;
    }

    try {
       await mongoose.connect(process.env.MONGODB_URI || "", {
        dbName: "mizou_admin_dashboard_db",
       });

       isConnected = true;
       console.log("Connected to MongoDB");

    } catch (error) {
        console.log("Error connecting to MongoDB", error);
        
    }
    
}