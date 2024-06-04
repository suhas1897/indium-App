// models/event.js

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  date: { type: String, required: true },
  email: { type: String, required: true },
  events: [
    {
      name: { type: String, required: true },
      height: { type: Number, required: true },
    },
  ],
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
