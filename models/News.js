const { Schema, model } = require('mongoose')

const News = new Schema({
    title: { type: String, required: true },
    img: { type: String, required: true },
    date: { type: Date, required: true },
    content: { type: String, required: true },
})

module.exports = model('News', News)