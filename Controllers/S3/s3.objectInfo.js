import File from "../../Models/File.js";
import User from "../../Models/User.js";
import admin from "firebase-admin";

export default async function objectInfo(req, res) {
  const { id } = req.params;
  try {
    const file = await File.findById(id);

    if (!file)
      return res.status(404).json({ error: "Invalid Key, Not file found" });

    if (file.privacy === "private")
      return res.status(400).json({ error: "The file is private" });

    const { contact, contactVisibility } = await User.findOne({
      firebaseId: file.firebaseId,
    });

    const userInfo = await admin.auth().getUser(file.firebaseId);
    const displayName = userInfo.displayName;

    const fileAndUserInfo = {
      file,
      user: {
        contactVisibility,
        contact,
        displayName,
      },
    };

    res.status(200).json(fileAndUserInfo);
  } catch (err) {
    res.status(400).json(err.message);
  }
}
