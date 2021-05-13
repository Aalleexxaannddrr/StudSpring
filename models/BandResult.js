const { Schema, model } = require('mongoose')

const BandResult = new Schema({
    band_number_id: { type: String, required: true }, 
    })

module.exports = model('BandResult', BandResult)