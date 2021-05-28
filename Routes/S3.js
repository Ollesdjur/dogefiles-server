import express from "express";
const router = express.Router();
import verifyUser from "../Middlewares/verifyUser.js";
import {
  signedUrl,
  listObjects,
  saveFileToDB,
  listUploads,
  deleteFile,
  updatePrivacy,
} from "../Controllers/S3.js";

router.route("/signedUrl").post(verifyUser, signedUrl);
router.route("/listObjects").get(verifyUser, listObjects);
router.route("/listUploads").post(listUploads);
router.route("/saveFileToDB").post(saveFileToDB);
router.route("/deleteFile").post(deleteFile);
router.route("/updatePrivacy").post(updatePrivacy);

export default router;
