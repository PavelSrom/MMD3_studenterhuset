const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
  // getting the token
  const token = req.header('x-auth-token')
  // if the token isn't present, we throw 401
  if (!token) return res.status(401).json({ msg: 'Missing token' })

  try {
    // trying to decode the token
    const decoded = jwt.verify(token, config.get('jwtSecret'))
    // if it's been successful, we assign req.userID as the user's ID
    req.userID = decoded.id
    // we call next() to proceed to the route, otherwise the request would timeout
    next()
  } catch (err) {
    console.error(err.message)
    return res.status(403).json({ msg: 'Invalid token' })
  }
}
