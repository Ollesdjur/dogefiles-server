import { v4 } from "uuid";
const uuidv4 = v4;
import getS3 from "../../Config/s3.js";
import { DOGEFILES_AVATAR, DOGEFILES_AVATAR_DEV } from "./s3.constants.js";

export default async function presignedAvatarUrl(req, res) {
  const s3 = getS3();
  const firebaseId = req.firebaseId;
  const { fileName, fileSize, fileType } = req.body;
  console.log(fileName, fileSize, fileType);

  if (fileType.includes("gif")) {
    return res.status(400).json({ error: "gif is not allowed" });
  }

  if (fileSize > 1000000) {
    return res
      .status(400)
      .json({ error: "Upload size exceeded. Max size is 1 MB" });
  }

  const uuidv = uuidv4();

  s3.createPresignedPost(
    {
      Fields: {
        key: `${firebaseId}/${fileName}-${uuidv}.${fileType.split("/")[1]}`,
      },
      Conditions: [
        ["starts-with", "$Content-Type", "image/"],
        ["content-length-range", 0, 1000000],
      ],
      Expires: 1800,
      Bucket:
        process.env.NODE_ENV === "development"
          ? DOGEFILES_AVATAR_DEV
          : DOGEFILES_AVATAR,
    },
    (err, signed) => {
      if (!err) return res.json(signed);

      return res.status(400).json({ error: err.message });
      // https://avatar0007.s3.eu-central-1.wasabisys.com//'
    }
  );
}
