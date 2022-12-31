import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(400, "You are not authenticated. !"));
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return next(createError(404), "Token is invalid !");
    req.user = user;
    // console.log(user);
    next();
  });
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
