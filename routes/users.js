import express from "express";
const router = express.Router();
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/users.js";
import { verifyUser, verifyAdmin } from "../utils/verify.js";

//UPDATE
router.put("/updateUser/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("user/:id", verifyUser, getUser);

//GET ALL
router.get("/", verifyAdmin, getUsers);

export default router;
