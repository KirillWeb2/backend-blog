import News from "../models/news.js"

export const getAll = async (req, res) => {
    try {
        const news = await News.find().populate('author').exec()

        res.status(200).json(news)
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}

export const getOne = async (req, res) => {
    try {
        const { id } = req.params

        const news = await News.findOneAndUpdate(
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

        res.status(200).json(news)
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}

export const create = async (req, res) => {
    try {
        const data = req.body

        const newNews = new News({ ...data })

        await newNews.save()

        res.status(200).json({ msg: "Пост создан", news: newNews })
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}

export const change = async (req, res) => {
    try {
        const data = req.body

        await News.updateOne(
            { _id: data.id },
            {
                $set: data
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
        const { id } = req.body

        await News.deleteOne({ _id: id })

        res.status(200).json({ msg: "Пост удалён" })
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}
