import User from "../models/user.js"
import Post from "../models/post.js"
import bcrypt from 'bcrypt'

export const allUsers = async (req, res) => {
    try {
        const users = await User.find()

        res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}

export const remove = async (req, res) => {
    try {
        const { id } = req.params

        await User.deleteOne({ _id: id })

        res.status(200).json({ msg: "Данные пользователя изменены" })
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}

export const change = async (req, res) => {
    try {
        const data = req.body

        const hashPassword = await bcrypt.hashSync(data.password, 12)

        await User.updateOne(
            { _id: data._id },
            {
                $set: {
                    ...data,
                    password: hashPassword
                }
            }
        )

        res.status(200).json({ msg: "Данные пользователя изменены" })
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}

export const posts = async (req, res) => {
    try {
        const { id } = req.params

        const user = await User.findOne({ _id: id })

        const posts = await Post.find({ author: id })

        res.status(200).json({ user, posts })
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}