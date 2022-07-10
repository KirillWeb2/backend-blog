import Post from "../models/post.js"
import jwt from 'jsonwebtoken'
import fs from 'fs'
import { config } from "../config/config.js"

export const getAll = async (req, res) => {
    try {
        const { cat, limit } = req.query

        const post = await Post.find().populate('author').limit(limit).exec()

        if (cat) {
            const posts = post.map(i => i.tags.find(k => k === cat) ? i : null).filter(i => !!i)

            return res.status(200).json(posts)
        }

        res.status(200).json(post)
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}

export const getPopular = async (req, res) => {
    try {
        const post = await Post.find().sort({ viewsCount: -1 }).limit(4)

        res.status(200).json(post)
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}

export const getTags = async (req, res) => {
    try {
        const post = await Post.find()

        const obj = {}

        post.forEach(i => i.tags.forEach(k => obj[k] ? obj[k]++ : obj[k] = 1))

        const tags = []

        for (let item in obj) {
            tags.push({
                id: String(Math.random()), value: item, quantity: obj[item]
            })
        }

        res.status(200).json(tags)
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}


export const getOne = async (req, res) => {
    try {
        const { id } = req.params

        if (id === 'null') {
            return res.status(200).json(null)
        }

        const post = await Post.findOneAndUpdate(
            {
                _id: id
            },
            {
                $inc: { viewsCount: 1 },
            },
            {
                returnDocument: "after"
            }
        ).populate('author').exec()

        res.status(200).json(post)
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}

export const create = async (req, res) => {
    try {
        const data = req.body

        const author = jwt.decode(req.headers.authorization, config.secretKey)

        const newPost = new Post({ ...data, author })

        await newPost.save()

        res.status(200).json({ msg: "Пост создан", post: newPost })
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}

export const change = async (req, res) => {
    try {
        const data = req.body

        await Post.updateOne(
            { _id: data._id },
            {
                $set: {
                    title: data.title,
                    text: data.text,
                    img: data.img,
                    tags: data.tags
                }
            }
        )

        res.status(200).json({ msg: "Пост изменён" })
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}

export const remove = async (req, res) => {
    try {
        const { id } = req.params

        const post = await Post.findOne({ _id: id })

        if (post && post.img) {
            fs.unlink(`uploads/${post.img}`, err => {
                if (err) {
                    console.log(err)
                }
            })
        }

        await Post.deleteOne({ _id: id })

        res.status(200).json({ msg: "Пост удалён" })
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}
