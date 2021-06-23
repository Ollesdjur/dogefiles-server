import express from "express";
const router = express.Router();
import getS3 from "../Config/s3.js";

const createNewBucket = async (req, res) => {
  const s3 = getS3();
  const { bucketName } = req.body;
  var params = {
    Bucket: bucketName,
  };
  s3.createBucket(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else console.log(data); // successful response
    /*
     data = {
      Location: "/examplebucket"
     }
     */
  });
};

router.route("/").get(createNewBucket);

export default router;
