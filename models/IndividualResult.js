const { Schema, model } = require('mongoose')

const IndividualResult = new Schema({
    individual_number_id: { type: String, required: true }, 
    })

module.exports = model('IndividualResult', IndividualResult)