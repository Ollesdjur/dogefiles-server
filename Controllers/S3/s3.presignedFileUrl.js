import { v4 } from "uuid";
const uuidv4 = v4;
import getS3 from "../../Config/s3.js";

export default async function (req, res) {
  const s3 = getS3();
  const firebaseId = req.firebaseId;
  const { fileName, fileSize, fileType } = req.body;
  console.log(fileName, fileSize, fileType);

  if (fileSize > 1.01e8) {
    return res
      .status(400)
      .json({ error: "Upload size exceeded. Max size is 100 MB" });
  }

  // useAccelerateEndpoint: true :( Paid feature

  const uuidv = uuidv4();

  s3.createPresignedPost(
    {
      Fields: {
        key: `${firebaseId}/${fileName}-${uuidv}.${fileType}`,
      },
      Conditions: [
        // ["starts-with", "$Content-Type", "image/"],
        ["content-length-range", 0, 1.01e8],
      ],
      Expires: 1800,
      Bucket: "dogefiles-main",
    },
    (err, signed) => {
      console.log(err);
      if (!err) return res.json(signed);

      return res.status(400).json({ error: err.message });

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

  // var params = {
  //   Bucket: "testpole",
  //   Key: `alex@gmail.com/${uuidv}.png`,
  //   Expires: 1000,
  //   ResponseContentDisposition: `attachment; filename="${"CAT.png"}"`,
  // };
  // var url = s3.getSignedUrl("getObject", params);
  // console.log("The URL is", url);
}
