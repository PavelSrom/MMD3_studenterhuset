const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const Profile = require('../models/Profile')
const auth = require('../middleware/auth')

// DESC:      get all user profiles
// ACCESS:    private
// ENDPOINT:  /api/profile
router.get('/', auth, async (req, res) => {
  try {
    // fetching all users from the database
    const allUsers = await Profile.find()
    // and returning them to the client
    // just two lines of code, how crazy is that
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
    // fetching my profile
    const myProfile = await Profile.findOne({ user: req.userID })
    // returns 200 even if the user has no profile - on purpose
    // take care of this in React
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
    // fetching the profile by id
    const targetUser = await Profile.findOne({ user: req.params.id })
    // if there's no such profile, we throw 404
    if (!targetUser) return res.status(404).json({ msg: 'Profile not found' })
    // returning it to the client
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
    // request body validation
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })
    // destructuring all props
    const {
      firstName,
      lastName,
      role,
      interests,
      phoneNumber,
      isAdmin
    } = req.body
    // creating new profile fields
    const profile = {
      user: req.userID,
      firstName,
      lastName,
      role,
      interests
    }
    // if phone number and isAdmin are provided, we create them too
    if (phoneNumber) profile.phoneNumber = phoneNumber
    if (isAdmin) profile.isAdmin = isAdmin

    try {
      // checking if the profile already exists
      const profileExists = await Profile.findOne({ user: req.userID })
      if (profileExists)
        // if it does, we throw 400
        return res.status(400).json({ msg: 'Profile already exists' })
      // if it doesn't, we create a new profile
      const newProfile = new Profile(profile)
      // save it to DB
      await newProfile.save()
      // and return to the client
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
  const { role, interests, phoneNumber, isPresent } = req.body

  try {
    // fetching the user's profile
    const profile = await Profile.findOne({ user: req.userID })
    // error handing
    if (!profile) return res.status(404).json({ msg: 'Profile not found' })

    // checking what is present and updating it accordingly
    if (role) profile.role = role
    if (interests) profile.interests = interests
    if (phoneNumber) profile.phoneNumber = phoneNumber
    isPresent && isPresent === true
      ? (profile.isPresent = true)
      : (profile.isPresent = false)
    // saving it to database
    await profile.save()
    // and returning to the client
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
    // fetching the profile that should be updated
    const profile = await Profile.findById(req.params.id)
    if (!profile)
      return res.status(404).json({ msg: 'This user profile not found' })

    // checking what is present and updating it accordingly
    if (isAdmin) profile.isAdmin = isAdmin
    if (isFeatured) profile.isFeatured = isFeatured
    // saving changes
    await profile.save()
    // and returning it back to the client
    return res.json(profile)
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({ msg: err.message })
  }
})

module.exports = router
