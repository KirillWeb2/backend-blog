import mongoose from "mongoose"


const User = new mongoose.Schema({
    avatar: String,
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    news: [{
        type: mongoose.Types.ObjectId,
        ref: 'news',
        default: []
    }]
}, {
    timestamps: true
})

export default mongoose.model('users', User)