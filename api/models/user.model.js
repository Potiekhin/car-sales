import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "https://media.istockphoto.com/vectors/vector-car-icon-with-add-sign-car-icon-and-new-plus-positive-symbol-vector-id1137001522",
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
