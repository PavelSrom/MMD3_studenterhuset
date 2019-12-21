const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const auth = require('../middleware/auth')
const Announcement = require('../models/Announcement')
const Profile = require('../models/Profile')

// DESC:      get all announcements
// ACCESS:    private
// ENDPOINT:  /api/announcements
router.get('/', auth, async (req, res) => {
  try {
    const announcements = await Announcement.find()

    return res.json(announcements)
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({ msg: err.message })
  }
})

// DESC:      post a new announcement
// ACCESS:    private (admins)
// ENDPOINT:  /api/announcements
router.post(
  '/',
  [
    auth,
    check('text', 'Text is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })

    try {
      // check if i'm admin
      const me = await Profile.findOne({ user: req.userID })
      if (!me.isAdmin)
        return res
          .status(403)
          .json({ msg: "You're not allowed to perform this task" })

      const newAnnouncement = new Announcement({
        user: req.userID,
        firstName: me.firstName,
        lastName: me.lastName,
        text: req.body.text
      })

      await newAnnouncement.save()

      return res.status(201).json(newAnnouncement)
    } catch (err) {
      console.error(err.message)
      return res.status(500).json({ msg: err.message })
    }
  }
)

module.exports = router
