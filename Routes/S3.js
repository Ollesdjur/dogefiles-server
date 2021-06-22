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
  objectInfo,
  downloadUrl,
  presignedAvatarUrl,
} from "../Controllers/S3.js";

// GET ROUTES
router.route("/listObjects").get(verifyUser, listObjects);
router.route("/objectInfo/:id").get(objectInfo);
router.route("/downloadObject").get(downloadUrl);

// POST ROUTES
router.route("/signedUrl").post(verifyUser, signedUrl);
router.route("/presignedAvatarUrl").post(verifyUser, presignedAvatarUrl);
router.route("/listUploads").post(listUploads);
router.route("/saveFileToDB").post(saveFileToDB);
router.route("/deleteFile").post(deleteFile);
router.route("/updatePrivacy").post(updatePrivacy);

export default router;
