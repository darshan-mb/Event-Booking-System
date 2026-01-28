const Event = require('../models/Event');

// GET all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch events' });
  }
};

// CREATE new event
const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create event' });
  }
};

module.exports = {
  getAllEvents,
  createEvent
};
