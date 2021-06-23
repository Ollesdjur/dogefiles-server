import File from "../../Models/File.js";

export default async function updatePrivacy(req, res) {
  const { firebaseId, key, privacy } = req.body;
  try {
    const filter = { firebaseId, key };
    const update = { privacy };
    const file = await File.findOneAndUpdate(filter, update);
    res.status(201).json({ file });
  } catch (err) {
    res.status(400).json(err.message);
  }
}
