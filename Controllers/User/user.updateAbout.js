import User from "../../Models/User.js";

export default async function updateAbout(req, res) {
  const firebaseId = req.firebaseId;
  const { about } = req.body;
  try {
    const filter = { firebaseId };
    const update = { about };
    await User.findOneAndUpdate(filter, update);
    res.status(201).json({ success: true, about });
  } catch (err) {
    res.status(400).json(err.message);
  }
}

// export default async function changeAbout(req, res) {
//   // const firebaseId = req.firebaseId;
//   const { firebaseId, about } = req.body;
//   try {
//     const filter = { firebaseId };
//     const update = { about };
//     const users = await User.find();
//     await users.map(async (user) => await user.update({ about: "" }));

//     res.status(201).json(users);
//   } catch (err) {
//     res.status(400).json(err.message);
//   }
// }
