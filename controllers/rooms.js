import Hotels from "../models/Hotels.js";
import Rooms from "../models/Rooms.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Rooms(req.body);
  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotels.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json({ room: savedRoom });
  } catch (err) {
    next(err);
    console.log("create room error in backend: ", err);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Rooms.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ room: updatedRoom });
  } catch (err) {
    next(err);
    console.log("Update room error in backend: ", err);
  }
};

export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Rooms.updateOne(
      { "roomNumbers._id": req.params.id },
      { $push: { "roomNumbers.$.unavailableDates": req.body.dates } }
    );
    res.status(200).json({ message: "Room Availability updated successfully" });
  } catch (err) {
    next(err);
    console.log("room availability update error in backend: ", err);
  }
};

// export const deleteRoom = async (req, res, next) => {
//   const hotelId = req.params.hotelId;
//   try {
//     await Rooms.findByIdAndDelete(req.params.id);
//     try {
//       await Hotels.findByIdAndUpdate(hotelId, {
//         $pull: { rooms: req.params.id },
//       });
//     } catch (err) {
//       next(err);
//     }
//   } catch (err) {
//     next(err);
//     console.log("delete room error in backend: ", err);
//   }
// };

export const deleteRoom = async (req, res, next) => {
  try {
    await Rooms.findByIdAndDelete(req.params.id);
    try {
      await Hotels.findByIdAndUpdate(req.params.hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const room = await Rooms.findById(req.params.id);
    res.status(200).send(room);
  } catch (err) {
    next(err);
    console.log("get room error in backend: ", err);
  }
};

export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Rooms.find();
    res.status(200).send(rooms);
  } catch (err) {
    next(err);
    console.log("get rooms error in backend: ", err);
  }
};
