const { Schema, model, Types } = require('mongoose')

const User = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isOrganizer: { type: Boolean, required: true },
})

module.exports = model('User', User)