const Booking = require('../models/Booking');
const Event = require('../models/Event');

// CREATE booking
const createBooking = async (req, res) => {
  try {
    const { eventId, name, email, tickets } = req.body;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const availableTickets = event.totalTickets - event.bookedTickets;

    if (tickets > availableTickets) {
      return res.status(400).json({
        message: `Only ${availableTickets} tickets left`
      });
    }

    const booking = new Booking({
      event: eventId,
      name,
      email,
      tickets
    });

    await booking.save();

    event.bookedTickets += tickets;
    await event.save();

    res.status(201).json({
      message: 'Booking successful',
      booking
    });
  } catch (error) {
    res.status(500).json({ message: 'Booking failed' });
  }
};

module.exports = {
  createBooking
};
