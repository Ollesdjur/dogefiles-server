import mongoose from "mongoose";

const fileDownloadLogsSchema = new mongoose.Schema(
  {
    // createdAt: { type: Date, expires: 60, default: Date.now },
    fileId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "File",
    },
    ip: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

fileDownloadLogsSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 }); //24 hours

const fileDownloadLogs = mongoose.model(
  "fileDownloadLogs",
  fileDownloadLogsSchema
);
export default fileDownloadLogs;
