import mongoose from "mongoose";

const connectDB = async () => {
  const MONGODB_URI =
    process.env.ENVIRONMENT === "dev"
      ? process.env.MONGODB_URI_DEV
      : process.env.MONGODB_URI;
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  console.log("MongoDB Connected");
};

export default connectDB;
