import express from "express";
const router = express.Router();
import IP_Logs from "../Models/IP_Logs.js";

const test = async (req, res, next) => {
  // const ipLog = await IP_Logs.create({});
  // console.log(ipLog);
  console.log(req.ip);
  console.log(req.connection.remoteAddress);
  res
    .status(200)
    .json({
      success: "You reached the route successfully",
      ip: req.ip,
      remoteA: req.connection.remoteAddress,
    });
};

router.route("/").get(test);

export default router;
