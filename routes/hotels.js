import express from "express";
const router = express.Router();
import {
  createHotel,
  getHotel,
  getHotels,
  updateHotel,
  deleteHotel,
  countByCity,
  countByType,
  getHotelRooms,
} from "../controllers/hotels.js";
import { verifyAdmin } from "../utils/verify.js";

router.route("/createHotel").post(verifyAdmin, createHotel);

router.route("/updateHotel/:id").put(verifyAdmin, updateHotel);

router.route("/deleteHotel/:id").delete(verifyAdmin, deleteHotel);

router.route("/").get(getHotels);

router.route("/hotel/:id").get(getHotel);

router.route("/countByType").get(countByType);

router.route("/countByCity").get(countByCity);

router.route("/rooms/:id").get(getHotelRooms);

export default router;

// :id means hotel's id
