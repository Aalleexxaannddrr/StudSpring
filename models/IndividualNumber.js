const { Schema, model } = require('mongoose')

const IndividualNumber = new Schema({
    participant_id: { type: String, required: true },
    name: { type: String, required: true },
    nomination_id: { type: String, required: true },
    rating: { type: String, required: true },
    })

module.exports = model('IndividualNumber', IndividualNumber)