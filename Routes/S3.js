import express from "express";
const router = express.Router();
import verifyUser from "../Middlewares/verifyUser.js";
import {
  presignedAvatarUrl,
  presignedFileUrl,
  listObjects,
  listUploads,
  saveFileToDB,
  deleteFile,
  updatePrivacy,
  objectInfo,
  downloadUrl,
  s3test,
} from "../Controllers/S3/index.js";

// GET ROUTES
router.route("/listObjects").get(verifyUser, listObjects);
router.route("/objectInfo/:id").get(objectInfo);
router.route("/downloadObject").get(downloadUrl);

// POST ROUTES
router.route("/signedUrl").post(verifyUser, presignedFileUrl);
router.route("/presignedAvatarUrl").post(verifyUser, presignedAvatarUrl);
router.route("/listUploads").post(listUploads);
router.route("/saveFileToDB").post(saveFileToDB);
router.route("/deleteFile").post(deleteFile);
router.route("/updatePrivacy").post(updatePrivacy);

//test
router.route("/test").get(s3test);

export default router;
