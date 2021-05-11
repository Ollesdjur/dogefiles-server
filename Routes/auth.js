import express from "express";
const router = express.Router();
import User from "../Models/User.js";
import verifyUser from "../Middlewares/verifyUser.js";

const authUser = async (req, res, next) => {
  try {
    const { userData } = req.body;
    const firebaseId = req.firebaseId;
    
    if(await User.findOne({firebaseId})) {
      return res.status(200).json({success: "User already registered"});
    }

    await User.create({
      firebaseId: firebaseId,
      displayName: userData.displayName,
      email: userData.email,
      photoURL: userData.photoURL ? userData.photoURL : "https://i.redd.it/pep8n5ohwlt01.jpg",
      providerId: userData.providerId,
      uid: userData.uid
    });
    
    return res.status(201).json({ success: "New user registered successfully" });
  } catch(error) {
    return res.status(401).json(error.message);
  }
}

router.route("/").post(verifyUser, authUser);

export default router;
