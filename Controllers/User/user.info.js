import User from "../../Models/User.js";

export default async function UserInfo(req, res) {
  const firebaseId = req.firebaseId;
  try {
    const user = await User.findOne({ firebaseId: firebaseId });
    res.status(201).json({ success: true, user });
  } catch (err) {
    res.status(400).json(err.message);
  }
}
