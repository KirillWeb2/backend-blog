const { Schema, model, Types } = require('mongoose')

const news = new Schema({
    author: {
        required: true,
        type: Types.ObjectId,
        ref: "users"
    },
    text: String,
    img: String,
    tags: {
        type: [String],
        default: []
    },
    viewsCount: {
        type: Number,
        default: 0,
    },
}, { 
    timestamps: true 
})

module.exports = model('news', news)