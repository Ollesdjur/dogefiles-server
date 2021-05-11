import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firebaseId: { type: String, required: true, unique: true },
    // displayName: { type: String, required: true },
    // email: { type: String, required: true, unique: true },
    // photoURL: { type: String, required: true },
    // providerId: { type: String, required: true },
    // uid: { type: String, required: true }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
