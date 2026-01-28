const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Event = require("../models/Event");

// POST: create booking
router.post("/", async (req, res) => {
  try {
    const { eventId, name, email, tickets } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const available =
      event.totalTickets - event.bookedTickets;

    if (tickets > available) {
      return res
        .status(400)
        .json({ message: `Only ${available} tickets left` });
    }

    event.bookedTickets += tickets;
    await event.save();

    const booking = new Booking({
      eventId,
      name,
      email,
      tickets
    });

    await booking.save();

    res.status(201).json({
      message: "Booking successful",
      booking
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
