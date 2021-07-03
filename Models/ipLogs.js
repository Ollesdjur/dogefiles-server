import mongoose from "mongoose";

const ipLogsSchema = new mongoose.Schema(
  {
    ip: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

ipLogsSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 }); //5mins

const ipLogs = mongoose.model("ipLogs", ipLogsSchema);
export default ipLogs;
