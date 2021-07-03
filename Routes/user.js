import express from "express";
const router = express.Router();
import verifyUser from "../Middlewares/verifyUser.js";
import {
  userInfo,
  updateContact,
  updateContactVisibility,
} from "../Controllers/User/index.js";

//GET ROUTES
router.route("/userInfo").get(verifyUser, userInfo);

// PUT ROUTES
router.route("/updateContact").put(verifyUser, updateContact);
router
  .route("/updateContactVisibility")
  .put(verifyUser, updateContactVisibility);

export default router;
