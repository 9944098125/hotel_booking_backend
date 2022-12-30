import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3500;

app.listen(port, () => {
  console.log(`App is now running on port ${port}`);
});

// mongodb+srv://srinivas:thisisasecret@cluster0.pll6b.mongodb.net/hotel_booking
// require('crypto').randomBytes(64).toString('hex')
