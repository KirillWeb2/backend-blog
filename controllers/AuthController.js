import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import { config } from '../config/config.js'
import bcrypt from 'bcrypt'


export const register = async (req, res) => {
    try {
        const { email, fullName, password } = req.body

        const isExists = await User.findOne({ email })

        if (isExists) {
            return error(res, 300, { msg: "Email занят" })
        }

        const hashPassword = await bcrypt.hashSync(password, 12)

        const newUser = new User({
            password: hashPassword,
            fullName,
            email
        })

        const token = jwt.sign(
            {
                _id: newUser._id
            },
            config.secretKey,
            {
                expiresIn: '30d',
            }
        )

        await newUser.save()

        return res.json({ token, user: newUser })
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ msg: "Email или пароль введены неверно" })
        }

        const check = await bcrypt.compare(password, user.password)

        if (!check) {
            return res.status(400).json({ msg: "Email или пароль введены неверно" })
        }

        const token = jwt.sign(
            {
                _id: user._id
            },
            config.secretKey,
            {
                expiresIn: '30d',
            }
        )

        return res.json({ token, user })
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}

export const auth = async (req, res) => {
    try {
        const { token } = req.headers

        const { _id } = jwt.decode(token, config.secretKey)

        const user = await User.findOne({ _id })

        return res.json({ user })
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}