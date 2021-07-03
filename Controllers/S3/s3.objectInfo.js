import File from "../../Models/File.js";

export default async function objectInfo(req, res) {
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
}
