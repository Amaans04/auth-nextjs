import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.on("error", console.error.bind(console, "MongoDB connection error:"));
        connection.once("open", function () {
            console.log("Connected to MongoDB");
        });
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
}
