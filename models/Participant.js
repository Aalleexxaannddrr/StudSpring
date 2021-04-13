const { Schema, model } = require('mongoose')

const Participant = new Schema({
    educarional_establishment_id: { type: String, required: true },
    name: { type: String, required: true },
    birthday: { type: Date, required: true },
    email: { type: String, required: true },
})

module.exports = model('Participant', Participant)