import express from "express";
const router = express.Router();
import IP_Logs from "../Models/IP_Logs.js";
import sniffData from "../Middlewares/sniffData.js";

const test = async (req, res, next) => {
  // const ipLog = await IP_Logs.create({});
  // console.log(ipLog);
  res.status(200).json({
    success: "Your sniffed data",
    ip: req.ip,
    remoteA: req.connection.remoteAddress,
    sniff_data: req.sniff_data,
  });
};

router.route("/").get(sniffData, test);

export default router;
