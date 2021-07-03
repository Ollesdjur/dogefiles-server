import File from "../../Models/File.js";
import getS3 from "../../Config/s3.js";

export default async function deleteFile(req, res) {
  const s3 = getS3();

  const { bucket, key, firebaseId } = req.body;

  const params = {
    Bucket: bucket,
    Key: key,
  };

  await s3.deleteObject(params, async (err, data) => {
    if (err) return res.status(400).json({ error: err.message });
    await File.findOneAndDelete({ firebaseId, key });
    res.status(200).json(data);
  });
}
