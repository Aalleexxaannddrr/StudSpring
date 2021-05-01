const { Schema, model } = require('mongoose')

const Nomination = new Schema({
    name: { type: String, required: true },
})

module.exports = model('Nomination', Nomination)