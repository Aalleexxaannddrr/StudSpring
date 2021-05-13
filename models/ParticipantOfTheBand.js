const { Schema, model } = require('mongoose')

const ParticipantOfTheBand = new Schema({
    band_id: { type: String, required: true },
    name: { type: String, required: true },
    birthday: { type: Date, required: true },
    email: { type: String, required: true },
    phone_number: {type: String, required: true}
})

module.exports = model('ParticipantOfTheBand', ParticipantOfTheBand)