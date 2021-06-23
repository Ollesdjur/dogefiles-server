import File from "../../Models/File.js";
import fileDownloadLogs from "../../Models/fileDownloadLogs.js";
import getS3 from "../../Config/s3.js";
import { DOGEFILES_MAIN, DOGEFILES_MAIN_DEV } from "./s3.constants.js";

export default async function downloadUrl(req, res) {
  const s3 = getS3();

  const { id } = req.query;
  const ip = req.clientIp;
  console.log("IP Address Requested to Download File", ip);

  try {
    const file = await File.findById(id);
    if (!file)
      return res.status(404).json({ error: "Invalid Key, Not file found" });

    if (file.privacy === "private")
      return res
        .status(400)
        .json({ error: "Private files are not availabe to download" });

    const params = {
      Bucket:
        process.env.NODE_ENV === "development"
          ? DOGEFILES_MAIN_DEV
          : DOGEFILES_MAIN,
      Key: file.key,
      Expires: 1000,
      ResponseContentDisposition: `attachment; filename="${file.fileName}"`,
    };

    const url = s3.getSignedUrl("getObject", params);

    // Check if the user has already downloaded the file once in a day
    if (!(await fileDownloadLogs.findOne({ fileId: file._id, ip: ip }))) {
      console.log("New IP found", ip);
      await fileDownloadLogs.create({ fileId: file._id, ip: ip });

      file.downloads.push({ ip: ip });

      await file.save();
    } else {
      console.log("Old IP found", ip);
    }

    return res.status(200).json({ downloadLink: url, file });
  } catch (err) {
    res.status(404).json(err.message);
  }
}
