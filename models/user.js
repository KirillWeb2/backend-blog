import mongoose from "mongoose"


const UserSchema = new mongoose.Schema({
    avatar: String,
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // news: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'News',
    //     default: []
    // }]
}, {
    timestamps: true
})

export default mongoose.model('users', UserSchema)