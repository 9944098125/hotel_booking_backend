import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";

import auth from "./routes/auth.js";
import hotels from "./routes/hotels.js";
import rooms from "./routes/rooms.js";
import users from "./routes/users.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

async function connectDB() {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Successfully connected to the Data Base");
  } catch (err) {
    throw err;
  }
}

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB Data Base disconnecting...");
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB Data Base connecting...");
});

app.use("/api/auth", auth);
app.use("/api/hotels", hotels);
app.use("/api/rooms", rooms);
app.use("/api/users", users);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 409;
  const errorMessage = err.message || "Something went wrong, Please try again";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const port = process.env.PORT || 3500;

app.listen(port, () => {
  connectDB();
  console.log(`App is now running on port ${port}`);
});

// mongodb+srv://srinivas:thisisasecret@cluster0.pll6b.mongodb.net/hotel_booking
// require('crypto').randomBytes(64).toString('hex')
