import express from "express";
const router = express.Router();
import AWS from "aws-sdk";
import { v4 } from "uuid";
const uuidv4 = v4;

const signedUrl = async (req, res) => {
  const { fileName, fileSize, fileType } = req.body;
  console.log(fileName, fileSize, fileType);
  // useAccelerateEndpoint: true :( Paid feature
  const s3 = new AWS.S3({
    correctClockSkew: true,
    endpoint: process.env.AWS_S3_ENDPOINT,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    logger: console,
  });

  const uuidv = uuidv4();

  await s3.createPresignedPost(
    {
      Fields: {
        key: `alex@gmail.com/${fileName}${uuidv}.${fileType.split("/")[1]}`,
      },
      Conditions: [
        ["starts-with", "$Content-Type", "image/"],
        ["content-length-range", 0, 1000000000],
      ],
      Expires: 1800,
      Bucket: "meow0007",
    },
    (err, signed) => {
      res.json(signed);
      // var params = {
      //   Bucket: "dagiki",
      //   Key: `alex@gmail.com/${fileName}${uuidv}.${fileType.split("/")[1]}`,
      //   Expires: 1000,
      //   ResponseContentDisposition: `attachment; filename="${fileName}"`,
      // };
      // var url = s3.getSignedUrl("getObject", params);
      // console.log("The URL is", url);
      // res.json(signed);
    }
  );

  /**
   * Return a signed document URL given a Document instance
   * @param  {object} document Document
   * @return {string}          Pre-signed URL to document in S3 bucket
   */

  // var params = {Bucket: 'testpole', Key: `alex@gmail.com/${uuidv}.png`, Expires: 1000, ResponseContentDisposition: `attachment; filename="${"CAT.png"}"`};
  // var url = s3.getSignedUrl('getObject', params);
  // console.log('The URL is', url);
};

router.route("/").post(signedUrl);

export default router;
