/* eslint-disable no-undef */
require("dotenv").config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
})

const express = require('express')
const cors = require('cors')


const app = express()
app.use(cors())
app.use(express.json())
require('./app/routes/index')(app)

module.exports = app