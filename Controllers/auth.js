// Not needed 12 May 2021
import User from "../Models/User.js";

const loginUser = async (req, res, next) => {
  try {
    const firebaseId = req.firebaseId;

    if (await User.findOne({ firebaseId })) {
      return res
        .status(200)
        .json({ success: "User already registered, Login Sucess" });
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { userData } = req.body;
    const firebaseId = req.firebaseId;

    if (await User.findOne({ firebaseId })) {
      return res.status(400).json({ error: "User already registered" });
    }

    await User.create({
      firebaseId: firebaseId,
      displayName: userData.displayName,
      email: userData.email,
      photoURL: userData.photoURL
        ? userData.photoURL
        : "https://i1.sndcdn.com/avatars-000459287565-8boqnr-t500x500.jpg",
      providerId: userData.providerId,
      uid: userData.uid,
    });

    return res
      .status(201)
      .json({ success: "New user registered successfully" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

export { loginUser, registerUser };
