const { Schema, model } = require('mongoose')

const Band = new Schema({
    name: { type: String, required: true },
    educarional_establishment_id: { type: String, required: true }
})

module.exports = model('Band', Band)