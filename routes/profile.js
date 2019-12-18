const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const Profile = require('../models/Profile')
const auth = require('../middleware/auth')

// DESC:      get all user profiles
// ACCESS:    private
// ENDPOINT:  /api/profile
router.get('/', auth, async (req, res) => {
  try {
    const allUsers = await Profile.find()

    return res.json(allUsers)
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({ msg: err.message })
  }
})

// DESC:      get logged in user's profile
// ACCESS:    private
// ENDPOINT:  /api/profile/me
router.get('/me', auth, async (req, res) => {
  try {
    const myProfile = await Profile.findOne({ user: req.userID })
    if (!myProfile)
      return res.status(404).json({ msg: 'I do not have a profile' })

    return res.json(myProfile)
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({ msg: err.message })
  }
})

// DESC:      get a single user's profile
// ACCESS:    private
// ENDPOINT:  /api/profile/:id
router.get('/:id', auth, async (req, res) => {
  try {
    const targetUser = await Profile.findOne({ user: req.params.id })
    if (!targetUser) return res.status(404).json({ msg: 'Profile not found' })

    return res.json(targetUser)
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({ msg: err.message })
  }
})

// DESC:      create a new user's profile
// ACCESS:    private
// ENDPOINT:  /api/profile
router.post(
  '/',
  [
    auth,
    check('firstName', 'First name is required')
      .not()
      .isEmpty(),
    check('lastName', 'Last name is required')
      .not()
      .isEmpty(),
    check('role', 'Role is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })

    const { firstName, lastName, role, interests, contact, isAdmin } = req.body

    const profile = {
      user: req.userID,
      firstName,
      lastName,
      role,
      interests
    }
    if (contact) profile.contact = contact
    if (isAdmin) profile.isAdmin = isAdmin

    try {
      const profileExists = await Profile.findOne({ user: req.userID })
      if (profileExists)
        return res.status(400).json({ msg: 'Profile already exists' })

      const newProfile = new Profile(profile)

      await newProfile.save()

      return res.status(201).json(newProfile)
    } catch (err) {
      console.error(err.message)
      return res.status(500).json({ msg: err.message })
    }
  }
)

// DESC:      update logged in user's profile
// ACCESS:    private
// ENDPOINT:  /api/profile/me
router.put('/me', auth, async (req, res) => {
  // things that can be possibly updated (not mandatory)
  const { role, interests, contact, isPresent } = req.body

  try {
    const profile = await Profile.findOne({ user: req.userID })
    if (!profile) return res.status(404).json({ msg: 'Profile not found' })

    // checking what is present and updating it accordingly
    if (role) profile.role = role
    if (interests) profile.interests = interests
    if (contact) profile.contact = contact
    if (isPresent) profile.isPresent = isPresent

    await profile.save()

    return res.json(profile)
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({ msg: err.message })
  }
})

// DESC:      update user's profile by admins
// ACCESS:    private (admins)
// ENDPOINT:  /api/profile/:id
router.put('/:id', auth, async (req, res) => {
  const { isAdmin, isFeatured } = req.body

  try {
    // checking if i'm admin
    const myProfile = await Profile.findOne({ user: req.userID })

    if (!myProfile) return res.status(404).json({ msg: 'My profile not found' })
    if (!myProfile.isAdmin)
      // i'm not admin
      return res
        .status(403)
        .json({ msg: "You're not allowed to perform this task" })

    const profile = await Profile.findById(req.params.id)
    if (!profile)
      return res.status(404).json({ msg: 'This user profile not found' })

    // checking what is present and updating it accordingly
    if (isAdmin) profile.isAdmin = isAdmin
    if (isFeatured) profile.isFeatured = isFeatured

    await profile.save()

    return res.json(profile)
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({ msg: err.message })
  }
})

module.exports = router
