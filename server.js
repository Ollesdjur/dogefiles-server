import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./Config/db.js";
import admin from "firebase-admin";
import { promises } from "fs";

// Middlewares
// *** Sync Method *** //
// const importJSON = path => JSON.parse(readFileSync(path).toString());
// admin.initializeApp({
//   credential: admin.credential.cert(importJSON("serviceAccountKey.json"))
// });
// *** Sync Method Ends *** //

const importJSON = async (path, admin) => {
  const data = await promises
    .readFile(path)
    .catch((err) => console.error("Failed to load service key", err));

  admin.initializeApp({
    credential: admin.credential.cert(await JSON.parse(await data.toString())),
  });
};
importJSON("serviceAccountKey.json", admin);

const app = express();
dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());

// Route Imports
import auth from "./Routes/auth.js";
import signedUrl from "./Routes/signedUrl.js";
import test from "./Routes/test.js";
import fileDownload from "./Routes/fileDownload.js";
import downloadLink from "./Routes/downloadLink.js";
import S3 from "./Routes/S3.js";

app.use("/file-download/", fileDownload);
app.use("/test", test);
app.use("/get-signed-url", signedUrl);
app.use("/auth", auth);
app.use("/download-link", downloadLink);
app.use("/S3", S3);

app.get("/", (req, res) => {
  res.json("KloudPole Root");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
