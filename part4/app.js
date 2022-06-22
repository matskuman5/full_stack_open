const express = require('express')
require('express-async-errors')
const middleware = require('./utils/middleware')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const notesRouter = require('./controllers/blogs')

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', notesRouter)
app.use(middleware.errorHandler)

module.exports = app