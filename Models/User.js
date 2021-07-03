import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firebaseId: { type: String, required: true },
    contactVisibility: { type: Boolean, required: false, default: false },
    contact: {
      about: { type: String, required: false, default: "" },
      facebook: { type: String, required: false, default: "" },
      twitter: { type: String, required: false, default: "" },
      discord: { type: String, required: false, default: "" },
      telegram: { type: String, required: false, default: "" },
    },
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
