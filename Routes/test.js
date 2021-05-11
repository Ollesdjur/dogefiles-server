import express from "express";
const router = express.Router();
import verifyUser from "../Middlewares/verifyUser.js";

const test = async (req, res, next) => {
  res.status(200).json({success: "You reached the route successfully"});
}

router.route("/").get(verifyUser, test);

export default router;
