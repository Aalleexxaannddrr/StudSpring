const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('config')
const crypto = require('crypto')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-storage')
const methodOverride = require('method-override')

const PORT = config.get('port') || 5000

const app = express()

app.use(express.json({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride('_method'))

app.use('/api/auth', require('./routs/auth.routes'))
app.use('/api/band_number', require('./routs/band.number.routes'))
app.use('/api/band_result', require('./routs/band.result.routes'))
app.use('/api/band', require('./routs/band.routes'))
app.use('/api/education_establishment', require('./routs/education_establishment.routes'))
app.use('/api/individual_number', require('./routs/individual.number.routes'))
app.use('/api/individual_result', require('./routs/individual.result.routes'))
app.use('/api/news', require('./routs/news.routes'))
app.use('/api/nomination', require('./routs/nomination.routes'))
app.use('/api/participant_of_the_band', require('./routs/participant.of.the.band.routes'))
app.use('/api/participant', require('./routs/participant.routes'))
app.use('/api/user', require('./routs/user.routes'))

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        app.listen(PORT, () => console.log(`Server has been started on port ${PORT} ...`))
    } catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()