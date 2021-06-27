const { Schema, model } = require('mongoose')

const BandNumber = new Schema({
    band_id: { type: String, required: true },
    name: { type: String, required: true },
    nomination_id: { type: String, required: true },
    rating: { type: String, required: true },
    })

module.exports = model('BandNumber', BandNumber)