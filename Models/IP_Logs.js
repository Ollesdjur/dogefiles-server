import mongoose from "mongoose";

const IP_LogsSchema = new mongoose.Schema(
  {
    // createdAt: { type: Date, expires: 60, default: Date.now },
    ip: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

IP_LogsSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

const IP_Logs = mongoose.model("IP_Logs", IP_LogsSchema);
export default IP_Logs;
