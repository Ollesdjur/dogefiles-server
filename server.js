import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./Config/db.js";
import admin from "firebase-admin";
import loadServiceKey from "./Config/serviceKey.js";

const app = express();
dotenv.config();
connectDB();
loadServiceKey(
  process.env.SERVICE_ACCOUNT_KEY,
  process.env.SERVICE_ACCOUNT_SECRET,
  admin
);
app.use(cors());
app.use(express.json());

// Route Imports
import createNewBucket from "./Routes/bucket.js";
import test from "./Routes/test.js";
import auth from "./Routes/auth.js";
import S3 from "./Routes/S3.js";

app.use("/newBucket", createNewBucket);
app.use("/test", test);
app.use("/auth", auth);
app.use("/S3", S3);

app.get("/", (req, res) => {
  res.json("Dogefiles Root");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
