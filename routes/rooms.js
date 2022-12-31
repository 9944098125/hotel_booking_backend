import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/rooms.js";
import { verifyAdmin } from "../utils/verify.js";
const router = express.Router();

router.route("/createRoom/:hotelId").post(verifyAdmin, createRoom);

router.route("/updateRoom/:id").put(verifyAdmin, updateRoom);

router.route("/updateRoomAvailability/:id").put(updateRoomAvailability);

router.route("/deleteRoom/:hotelId/:id").delete(deleteRoom);

router.route("/room/:id").get(getRoom);

router.route("/").get(getRooms);

export default router;
