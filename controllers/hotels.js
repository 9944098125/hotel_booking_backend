import Hotels from "../models/Hotels.js";
import Rooms from "../models/Rooms.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotels(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(201).json({
      message: "Hotel created successfully",
      hotel: savedHotel,
    });
  } catch (err) {
    next(err);
    console.log("Create hotel error in backend: ", err);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotels.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      message: "Updated the Hotel successfully",
      hotel: updatedHotel,
    });
  } catch (err) {
    next(err);
    console.log("Update hotel error in backend: ", err);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotels.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted the Hotel successfully" });
  } catch (err) {
    next(err);
    console.log("Delete Hotel error in backend: ", err);
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotels.findById(req.params.id);
    res.status(200).json({
      message: "Found the hotel successfully",
      hotel,
    });
  } catch (err) {
    next(err);
    console.log("Get hotel error in backend: ", err);
  }
};

export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotels.find({
      ...others,
      cheapestPrice: { $gt: min || 1, $lt: max || 9999 },
    }).limit(req.query.limit);
    res.status(200).json({ hotels: hotels });
  } catch (err) {
    next(err);
    console.log("Get hotels error in backend: ", err);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotels.countDocuments({ city: city });
      })
    );
    res.status(200).json({ hotels: list });
  } catch (err) {
    next(err);
    console.log("count by city error in backend: ", err);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotels.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotels.countDocuments({ type: "apartment" });
    const resortCount = await Hotels.countDocuments({ type: "resort" });
    const villaCount = await Hotels.countDocuments({ type: "villa" });
    const cabinCount = await Hotels.countDocuments({ type: "cabin" });
    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
      { type: "cabin", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
    console.log("count by type error in backend: ", err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotels.findById(req.params.id);
    const rooms = await Promise.all(
      hotel.rooms.map((room) => {
        return Rooms.findById(room._id);
      })
    );
    res.status(200).json({ rooms: rooms });
  } catch (err) {
    next(err);
    console.log("Get Hotel rooms error in backend: ", err);
  }
};
