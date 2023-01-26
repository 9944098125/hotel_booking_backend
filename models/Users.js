import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
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
    country: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
    },
    isAdmin: {
      type: String,
      default: false,
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", usersSchema);

export default Users;
