import express from "express";
const router = express.Router();
import IP_Logs from "../Models/IP_Logs.js";
import sniffData from "../Middlewares/sniffData.js";

const test = async (req, res, next) => {
  const ip =
    req.sniff_data.ip_address.ip || req.sniff_data.ip_address.xForwardedFor;
  console.log(ip);

  if (await IP_Logs.findOne({ ip: ip })) {
    return res
      .status(200)
      .json({ err: "You can not download this file currently" });
  }

  const ipLog = await IP_Logs.create({ ip: ip });

  res.status(200).json({
    success: "Your sniffed data",
    ip: req.ip,
    remoteA: req.connection.remoteAddress,
    sniff_data: req.sniff_data,
    ipLog,
  });
};

router.route("/").get(sniffData, test);

export default router;
