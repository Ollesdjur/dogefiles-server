import mongoose from "mongoose";

// const fileSchema = new mongoose.Schema(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
//     userName: { type: String, required: true },
//     firebaseId: { type: String, required: true, unique: true },
//     email: { type: String, required: true, unique: true },
//     fileName: { type: String, required: true },
//     fileSize: { type: String, required: true },
//     url: { type: String, required: true },
//     urlExpiry: { type: Number, reuired: true },
//   },
//   {
//     timestamps: true
//   }
// )
const fileSchema = new mongoose.Schema(
  {
    // user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    firebaseId: { type: String, required: true },
    fileName: { type: String, required: true },
    fileSize: { type: Number, required: true },
    fileType: { type: String, required: true },
    key: { type: String, required: true },
    downloads: { type: Number, default: 0 },
    privacy: { type: String, default: "private" },
  },
  {
    timestamps: true,
  }
);

const File = mongoose.model("File", fileSchema);
export default File;
