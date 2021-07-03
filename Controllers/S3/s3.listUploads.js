import File from "../../Models/File.js";

export default async function listUploads(req, res) {
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
}
