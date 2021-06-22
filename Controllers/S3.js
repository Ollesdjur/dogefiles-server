import { v4 } from "uuid";
import File from "../Models/File.js";
import fileDownloadLogs from "../Models/fileDownloadLogs.js";
const uuidv4 = v4;
import getS3 from "../Config/s3.js";

export const signedUrl = async (req, res) => {
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
};

export const listObjects = (req, res) => {
  const s3 = getS3();

  const firebaseId = req.firebaseId;

  console.log("recieved", firebaseId);
  var params = {
    Bucket: "dogefiles-main",
  };
  s3.listObjects(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      // console.log("Success", data);
      const list = data.Contents.filter((item) =>
        item.Key.includes(firebaseId)
      );
      res.send(list);
    }
  });
};

export const saveFileToDB = async (req, res) => {
  const { fileName, fileSize, fileType, key, firebaseId } = req.body;

  try {
    await File.create({
      firebaseId,
      fileName,
      fileSize,
      fileType,
      key,
    });

    res.status(201).json({ success: "success" });
  } catch (err) {
    res.status(400).json({ error: "Unable to save the uploaded file to DB" });
  }
};

export const listUploads = async (req, res) => {
  const { firebaseId } = req.body;
  try {
    const files = await File.find({ firebaseId }).sort({ createdAt: -1 });

    if (files.length === 0) {
      return res.status(404).json({ error: "Root is empty, No files found" });
    }
    return res.status(200).json(files);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteFile = async (req, res) => {
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
};

export const updatePrivacy = async (req, res) => {
  const { firebaseId, key, privacy } = req.body;
  try {
    const filter = { firebaseId, key };
    const update = { privacy };
    const file = await File.findOneAndUpdate(filter, update);
    res.status(201).json({ file });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

export const objectInfo = async (req, res) => {
  const { id } = req.params;
  try {
    const file = await File.findById(id);

    if (!file)
      return res.status(404).json({ error: "Invalid Key, Not file found" });

    if (file.privacy === "private")
      return res.status(400).json({ error: "The file is private" });

    res.status(200).json(file);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

export const downloadUrl = async (req, res) => {
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
      Bucket: "dogefiles-main",
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
};

export const presignedAvatarUrl = async (req, res) => {
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
      Bucket: "dogefiles-avatar",
    },
    (err, signed) => {
      if (!err) return res.json(signed);

      return res.status(400).json({ error: err.message });
      // https://avatar0007.s3.eu-central-1.wasabisys.com//'
    }
  );
};
