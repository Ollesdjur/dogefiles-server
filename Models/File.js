import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    userName: { type: String, required: true },
    firebaseId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    fileName: { type: String, required: true },
    fileSize: { type: String, required: true },
    url: { type: String, required: true },
    urlExpiry: { type: Number, reuired: true },
  },
  {
    timestamps: true
  }
)

const File = mongoose.model("File", fileSchema);
export default File;