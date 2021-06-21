import mongoose from "mongoose";

const fileDownloadLogsSchema = new mongoose.Schema(
  {
    // createdAt: { type: Date, expires: 60, default: Date.now },
    file: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "File" },
    ip: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

fileDownloadLogsSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 });

const fileDownloadLogs = mongoose.model(
  "fileDownloadLogs",
  fileDownloadLogsSchema
);
export default fileDownloadLogs;
