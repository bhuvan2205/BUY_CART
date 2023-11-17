import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    if (!conn) {
      throw Error("Not able to connect");
    }
    console.log(
      `🚀Database connection established on ${conn?.connection?.host}`
    );
  } catch (error) {
    console.log(`👾${error?.message || error}`);
  }
};

export default connectDB;
