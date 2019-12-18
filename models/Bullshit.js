const mongoose = require('mongoose')

const bullshitSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        text: {
          type: String,
          required: true
        },
        firstName: {
          type: String
        },
        lastName: {
          type: String
        }
      }
    ]
  },
  {
    timestamps: true
  }
)

module.exports = Bullshit = mongoose.model('Bullshit', bullshitSchema)
