import express from "express";
const router = express.Router();
import AWS from "aws-sdk";

const downloadLink = async (req, res, next) => {
  const s3 = new AWS.S3({
    correctClockSkew: true,
    endpoint: process.env.AWS_S3_ENDPOINT,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    logger: console,
  });

  var params = {
    Bucket: "meow0007",
    // Key: `alex@gmail.com/${fileName}${uuidv}.${fileType.split("/")[1]}`,
    Key:
      "alex@gmail.com/webarebears.jpge72f41e3-a0ab-4425-a07c-45c0bc779689.jpeg",
    Expires: 30,
    ResponseContentDisposition: `attachment; filename="Beares.jpeg"`,
  };
  var url = s3.getSignedUrl("getObject", params);
  console.log("The URL is", url);
  res.json(url);
};

router.route("/").get(downloadLink);

export default router;
