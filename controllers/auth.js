import Users from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const newUser = new Users({
      ...req.body,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      user: savedUser,
    });
  } catch (err) {
    console.log("Register error in the backend: ", err);
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const availableUser = await Users.findOne({ email: req.body.email });
    if (!availableUser) {
      return next(createError(404, "User Not Found..."));
    }
    const isPasswordMatching = await bcrypt.compare(
      req.body.password,
      availableUser.password
    );

    if (!isPasswordMatching) {
      return next(createError(405, "Wrong Password or Email !"));
    }

    const token = jwt.sign(
      {
        id: availableUser._id,
        isAdmin: availableUser.isAdmin,
      },
      process.env.SECRET_KEY
    );
    const { password, isAdmin, ...otherDetails } = availableUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
    console.log("Login Error in backend: ", err);
  }
};
