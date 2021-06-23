import File from "../../Models/File.js";

export default async function saveFileToDB(req, res) {
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
}
