const { Schema, model } = require('mongoose')

const News = new Schema({
    title: { type: String, required: true },
    imgUrl: { type: String, required: true },
    content: { type: String, required: true },
})

module.exports = model('News', News)