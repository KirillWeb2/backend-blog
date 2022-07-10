import mongoose from "mongoose"


const UserSchema = new mongoose.Schema({
    avatar: { type: String, default: '' },
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
}, {
    timestamps: true
})

export default mongoose.model('users', UserSchema)