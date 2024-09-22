import mongoose from "mongoose";

const connectingDb = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URL}${process.env.DB_NAME}`);
    console.log("Database connected successfully!");
  } catch (error) {
    console.log(`Error Connecting Database`, error);
  }
};

export default connectingDb;
