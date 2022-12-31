import express from "express";
import { login, register } from "../controllers/auth.js";
const router = express.Router();
import { verifyToken } from "../utils/verify.js";

router.route("/register").post(register);
router.route("/login").post(login);

// router.get("/checkAuth", verifyToken, (req, res) => {
//   res.send("you are authenticated..");
// });

export default router;
