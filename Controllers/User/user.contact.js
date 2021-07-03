import User from "../../Models/User.js";

export default async function updateContact(req, res) {
  const firebaseId = req.firebaseId;

  try {
    const filter = { firebaseId };
    const user = await User.findOne(filter);

    user.contact = req.body.contact;

    await user.save();

    res.status(201).json({ success: true, user });
  } catch (err) {
    res.status(400).json(err.message);
  }
}
