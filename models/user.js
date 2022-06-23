const { Schema, model, Types } = require('mongoose')

const user = new Schema({
    avatar: String,
    fullName: { type: String, required: true },
    password: { type: string, required: true },
    email: { type: string, required: true, unique: true },
    news: [{
        type: Types.ObjectId,
        ref: 'news',
        default: []
    }]
}, { 
    timestamps: true 
})

module.exports = model('users', user)