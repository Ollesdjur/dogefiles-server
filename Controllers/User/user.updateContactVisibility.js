import User from "../../Models/User.js";

export default async function updateContact(req, res) {
  const firebaseId = req.firebaseId;
  const { contactVisibility } = req.body;

  try {
    const filter = { firebaseId };
    const update = { contactVisibility };
    await User.findOneAndUpdate(filter, update);

    res.status(201).json({ success: true });
  } catch (err) {
    res.status(400).json(err.message);
  }
}
