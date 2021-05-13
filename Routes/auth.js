import express from "express";
const router = express.Router();
import User from "../Models/User.js";
import verifyUser from "../Middlewares/verifyUser.js";

const authUser = async (req, res, next) => {
  try {
    const firebaseId = req.firebaseId;

    if (await User.findOne({ firebaseId })) {
      return res.status(200).json({ success: "User already registered" });
    }
    await User.create({
      firebaseId: firebaseId,
    });

    return res
      .status(201)
      .json({ success: "New user registered successfully" });
  } catch (error) {
    return res.status(401).json(error.message);
  }
};

router.route("/").get(verifyUser, authUser);

export default router;
