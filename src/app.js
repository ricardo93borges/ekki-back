/* eslint-disable no-undef */
require("dotenv").config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
})

const express = require('express')

class AppController {
    constructor() {
        this.app = express()

        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.app.use(express.json())
    }

    routes() {
        require('./app/routes/index')(this.app)
    }
}

module.exports = new AppController().app