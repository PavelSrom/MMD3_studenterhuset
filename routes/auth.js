const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')
const auth = require('../middleware/auth')
const User = require('../models/User')
const Profile = require('../models/Profile')

// DESC:      verify that the user is logging in with a valid token
// ACCESS:    private
// ENDPOINT:  /api/auth
router.get('/', auth, async (req, res) => {
  try {
    // fetch the user without password (sensitive data)
    const user = await User.findById(req.userID).select('-password')
    // if there's no such user, we throw 404
    if (!user) return res.status(404).json({ msg: 'User not found' })
    // return the user to the client
    return res.json(user)
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({ msg: err.message })
  }
})

// DESC:      register user in the app
// ACCESS:    public
// ENDPOINT:  /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Email is required')
      .not()
      .isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    // request body validation
    const errors = validationResult(req)
    if (!errors.isEmpty())
      // if there are validation errors, throw 400
      return res.status(400).json({ errors: errors.array() })

    const { email, password } = req.body

    try {
      // checking if an user with the given email exists
      const userExists = await User.findOne({ email })
      if (userExists)
        // if they do, that's bad and we want to throw 400
        return res
          .status(400)
          .json({ msg: 'User with this email already exists' })

      // otherwise, we create a new user and hash the password
      const newUser = new User(req.body)
      newUser.password = await bcrypt.hash(password, 8)
      // save to database
      await newUser.save()
      // create token for this user and make it expire after 1 hour (security reasons)
      const token = jwt.sign({ id: newUser._id }, config.get('jwtSecret'), {
        expiresIn: 3600
      })
      // return the token to the client
      return res.status(201).json({ token })
    } catch (err) {
      console.error(err.message)
      return res.status(500).json({ msg: err.message })
    }
  }
)

// DESC:      login user into the app
// ACCESS:    public
// ENDPOINT:  /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Email is required')
      .not()
      .isEmpty(),
    check('password', 'Password is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    // request body validation
    const errors = validationResult(req)
    if (!errors.isEmpty())
      // if there are validation errors, we throw 400
      return res.status(400).json({ errors: errors.array() })

    const { email, password } = req.body

    try {
      // trying to find the user with the given email
      const user = await User.findOne({ email })
      // if there's no such user, that's bad - incorrect email
      if (!user) return res.status(400).json({ msg: 'Invalid credentials' })
      // checking the password
      const isMatch = await bcrypt.compare(password, user.password)
      // if the passwords don't match, that's bad - incorrect password
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' })
      // creating a token and making it expire after 1 hour
      const token = jwt.sign({ id: user._id }, config.get('jwtSecret'), {
        expiresIn: 3600
      })
      // returning the token to the client
      return res.json({ token })
    } catch (err) {
      console.error(err.message)
      return res.status(500).json({ msg: err.message })
    }
  }
)

// DESC:      delete user account
// ACCESS:    private (admins)
// ENDPOINT:  /api/auth/delete/:id
router.delete('/delete/:id', auth, async (req, res) => {
  try {
    // checking if I'm admin
    const me = await Profile.findOne({ user: req.userID })
    if (!me.isAdmin)
      // if I'm not, I have no permission to do this operation
      return res
        .status(403)
        .json({ msg: "You're not allowed to perform this task" })
    // finding the user's profile that should be deleted
    const profileToDelete = await Profile.findOne({ user: req.params.id })
    // finding the user itself that should be deleted
    const userToDelete = await User.findById(req.params.id)
    // removing the above mentioned
    await profileToDelete.remove()
    await userToDelete.remove()
    // returning a response to the client
    return res.json({ msg: 'User and their account removed successfully' })
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({ msg: err.message })
  }
})

module.exports = router
