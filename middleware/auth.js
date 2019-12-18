const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token')
  if (!token) return res.status(401).json({ msg: 'Missing token' })

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'))
    req.userID = decoded.id

    next()
  } catch (err) {
    console.error(err.message)
    return res.status(403).json({ msg: 'Invalid token' })
  }
}
