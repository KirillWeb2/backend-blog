import mongoose from "mongoose"

const news = new mongoose.Schema({
    author: {
        required: true,
        type: mongoose.Types.ObjectId,
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

export default model('news', news)