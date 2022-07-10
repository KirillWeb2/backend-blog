import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
    author: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    title: { type: String, required: true },
    text: { type: String, required: true },
    img: { type: String, required: true },
    tags: {
        type: Array,
        default: []
    },
    viewsCount: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true
})

export default mongoose.model('posts', PostSchema)