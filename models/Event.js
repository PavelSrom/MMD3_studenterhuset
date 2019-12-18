const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  targetDate: {
    type: String,
    required: true,
    maxlength: 10 // length of 'DD-MM-YYYY' is 10
  }
})

module.exports = Event = mongoose.model('Event', eventSchema)
