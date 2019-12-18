const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')
const auth = require('../middleware/auth')
const User = require('../models/User')

// DESC:      verify that the user is logging in with a valid token
// ACCESS:    private
// ENDPOINT:  /api/auth
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userID).select('-password')
    if (!user) return res.status(404).json({ msg: 'User not found' })

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
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })

    const { email, password } = req.body

    try {
      const userExists = await User.findOne({ email })
      if (userExists)
        return res.status(400).json({ msg: 'User already exists' })

      const newUser = new User(req.body)
      newUser.password = await bcrypt.hash(password, 8)

      await newUser.save()

      const token = jwt.sign({ id: newUser._id }, config.get('jwtSecret'), {
        expiresIn: 3600
      })

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
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })

    const { email, password } = req.body

    try {
      const user = await User.findOne({ email })
      if (!user) return res.status(400).json({ msg: 'Invalid credentials' })

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' })

      const token = jwt.sign({ id: user._id }, config.get('jwtSecret'), {
        expiresIn: 3600
      })

      return res.json({ token })
    } catch (err) {
      console.error(err.message)
      return res.status(500).json({ msg: err.message })
    }
  }
)

module.exports = router
