const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const auth = require('../middleware/auth')
const Event = require('../models/Event')
const Profile = require('../models/Profile')

// DESC:      get events for today
// ACCESS:    private
// ENDPOINT:  /api/events
router.get('/', auth, async (req, res) => {
  try {
    // fetching the events where their target date matches today's date
    const todayEvents = await Event.find({
      targetDate: new Date().toLocaleDateString()
    })
    // returning those to the client
    return res.json(todayEvents)
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({ msg: err.message })
  }
})

// DESC:      post a new event
// ACCESS:    private (admins)
// ENDPOINT:  /api/events
router.post(
  '/',
  [
    auth,
    check('text', 'Text is required')
      .not()
      .isEmpty(),
    check('targetDate', 'Must be a valid date').isLength({ max: 10 })
  ],
  async (req, res) => {
    // request body validation
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })

    const { text, targetDate } = req.body

    try {
      // check if I'm admin
      const me = await Profile.findOne({ user: req.userID })
      if (!me.isAdmin)
        // if I'm not admin, we throw 403
        return res
          .status(403)
          .json({ msg: "You're not allowed to perform this task" })
      // creating a new event
      const newEvent = new Event({ text, targetDate })
      // saving it
      await newEvent.save()
      // and returning back to the client
      return res.status(201).json(newEvent)
    } catch (err) {
      console.error(err.message)
      return res.status(500).json({ msg: err.message })
    }
  }
)

module.exports = router
