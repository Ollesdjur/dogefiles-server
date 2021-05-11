import express from "express";
const router = express.Router();

const fileDownload = (req, res, next) => {
  const {uid} = req.params;
  res.send(uid);
}

router.route("/:uid").get(fileDownload);

export default router;
