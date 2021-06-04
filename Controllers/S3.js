import AWS from "aws-sdk";
import { v4 } from "uuid";
import File from "../Models/File.js";
const uuidv4 = v4;

export const signedUrl = async (req, res) => {
  const firebaseId = req.firebaseId;
  // const firebaseId = "qKIJwQUnREePR9Yu7jisyTFVcJu1";
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

  s3.createPresignedPost(
    {
      Fields: {
        key: `${firebaseId}/${fileName}-${uuidv}.${fileType.split("/")[1]}`,
      },
      Conditions: [
        // ["starts-with", "$Content-Type", "image/"],
        ["content-length-range", 0, 1000000000],
      ],
      Expires: 1800,
      Bucket: "meow0007",
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
  const firebaseId = req.firebaseId;

  const s3 = new AWS.S3({
    correctClockSkew: true,
    endpoint: process.env.AWS_S3_ENDPOINT,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    logger: console,
  });
  console.log("recieved", firebaseId);
  var params = {
    Bucket: "meow0007",
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
    const files = await File.find({ firebaseId });
    if (files.length === 0) {
      return res.status(404).json({ error: "Root is empty, No files found" });
    }
    return res.status(200).json(files);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteFile = async (req, res) => {
  const s3 = new AWS.S3({
    correctClockSkew: true,
    endpoint: process.env.AWS_S3_ENDPOINT,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    logger: console,
  });

  const { key, firebaseId } = req.body;

  const params = {
    Bucket: "meow0007",
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
  const s3 = new AWS.S3({
    correctClockSkew: true,
    endpoint: process.env.AWS_S3_ENDPOINT,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    logger: console,
  });

  const { id } = req.query;

  try {
    const file = await File.findByIdAndUpdate(id, { downloads: 100 });

    if (!file)
      return res.status(404).json({ error: "Invalid Key, Not file found" });

    if (file.privacy === "private")
      return res
        .status(400)
        .json({ error: "Private files are not availabe to download" });

    const params = {
      Bucket: "meow0007",
      Key: key,
      Expires: 1000,
      ResponseContentDisposition: `attachment; filename="${file.fileName}"`,
    };

    const url = s3.getSignedUrl("getObject", params);

    return res.status(200).json({ downloadLink: url });
  } catch (err) {
    res.status(404).json(err.message);
  }
};
