import admin from "firebase-admin";

export default async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ error: "Not authorized to access" });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    const firebaseId = decodedToken.uid;

    const userInfo = await admin.auth().getUser(firebaseId);
    console.log(userInfo);

    req.firebaseId = firebaseId;
    return next();
  } catch (error) {
    return res.status(401).json(error.message);
  }
};
