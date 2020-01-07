const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const app = express()

// using our routes and JSON data exchange
app.use(express.json())
app.use('/api/auth', require('./routes/auth'))
app.use('/api/profile', require('./routes/profile'))
app.use('/api/posts', require('./routes/bullshit'))
app.use('/api/announcements', require('./routes/announcement'))
app.use('/api/events', require('./routes/event'))

// connecting to database
mongoose
  .connect(config.get('mongoURI'), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Database connected'))
  .catch(err => {
    console.log('Database not connected')
    console.error(err.message)
  })

// running on the given port or port 5000
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))
