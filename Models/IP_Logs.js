import mongoose from "mongoose";

const IP_LogsSchema = new mongoose.Schema(
  {
    createdAt: { type: Date, expires: 120, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const IP_Logs = mongoose.model("IP_Logs", IP_LogsSchema);
export default IP_Logs;