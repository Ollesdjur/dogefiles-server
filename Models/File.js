import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    decision: { type: Boolean, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const fileSchema = new mongoose.Schema(
  {
    // user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    firebaseId: { type: String, required: true },
    fileName: { type: String, required: true },
    fileSize: { type: Number, required: true },
    fileType: { type: String, required: true },
    key: { type: String, required: true },
    downloads: [feedbackSchema],
    privacy: { type: String, default: "private" },
  },
  {
    timestamps: true,
  }
);

const File = mongoose.model("File", fileSchema);
export default File;
