const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// 🔹 TEST ROOT ROUTE (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.send("Event Booking API is running");
});

// 🔹 ROUTES
const eventRoutes = require("./routes/eventRoutes");
app.use("/api/events", eventRoutes);
const bookingRoutes = require("./routes/bookingRoutes");
app.use("/api/bookings", bookingRoutes);

// 🔹 DATABASE CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

// 🔹 START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
