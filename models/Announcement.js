const mongoose = require('mongoose')

const announcementSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  text: {
    type: String,
    required: true
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: '1d' }
  }
})

module.exports = Announcement = mongoose.model(
  'Announcement',
  announcementSchema
)
