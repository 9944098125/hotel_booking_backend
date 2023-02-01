import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";
import Users from "../models/Users.js";

export const verifyToken = async (req, res, next) => {
  let token;
  // console.log(req.headers);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      req.user = await Users.findById(decoded.userId);
      // console.log(decoded);
      // console.log(token);

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.params.isAdmin) {
      next();
    } else {
      next(createError(400, "You are not authorized !!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin === true) {
      next();
    } else {
      next(createError(404, "You are not authorized !"));
    }
  });
};
