import mongoose from "mongoose";

export const connectToDB = async () => {
    try {
        const connectionResponse = await mongoose.connect(`${process.env.MONGODB_URI}/minded2025`)
        console.log(connectionResponse.connection.host);
    } catch (error) {
        console.log(`Couldnt connect to MongoDB, Error: ${error}`);
    }
}