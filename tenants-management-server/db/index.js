const mongoose = require('mongoose')
const config = require('../config.properties')

mongoose
    .connect(config.connectionString, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db
