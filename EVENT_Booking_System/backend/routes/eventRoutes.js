const express = require("express");
const router = express.Router();
const transporter = require("../utils/mailer");
const Event = require("../models/Event"); // Make sure you have Event model in models/Event.js

// ======================
// GET /api/events
// ======================
router.get("/", async (req, res) => {
  try {
    const events = await Event.find(); // Fetch all events from MongoDB
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error.message);
    res.status(500).json({ message: "Server error while fetching events" });
  }
});

// ======================
// POST /api/events
// ======================
router.post("/", async (req, res) => {
  const { title, description, date, venue, totalTickets, userEmail } = req.body;

  // Validate required fields
  if (!title || !description || !date || !venue || !totalTickets || !userEmail) {
    return res.status(400).json({ message: "All fields including userEmail are required!" });
  }

  try {
    // Create new event document
    const newEvent = new Event({
      title,
      description,
      date,
      venue,
      totalTickets
    });

    // Save event to MongoDB
    await newEvent.save();

    // Prepare email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: `Event Created: ${title}`,
      text: `Hi!\n\nYour event "${title}" is successfully created for ${date} at ${venue}.\n\nThanks for using Event Booking System!`
    };

    // Send confirmation email
    await transporter.sendMail(mailOptions);

    res.status(201).json({ event: newEvent, message: "Event created and email sent!" });
  } catch (error) {
    console.error("Error creating event:", error.message);
    res.status(500).json({ message: "Server error while creating event" });
  }
});

module.exports = router;
