const { Schema, model } = require('mongoose')

const EducarionalEstablishment = new Schema({
    name: { type: String, required: true },
})

module.exports = model('EducarionalEstablishment', EducarionalEstablishment)