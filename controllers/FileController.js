import fs from 'fs'

export const file = async (req, res) => {
    try {
        const { name } = req.params

        const filename = req.files[0]

        if (!filename) {
            return res.status(300).json({ msg: "Не правильный формат изображения" })
        }

        if (name && name !== 'first') {
            const end = name.match(/\.[0-9a-z]+$/i)[0]
            const start = name.replace(end, '')
          
            fs.unlink(`uploads/${start}${end}`, err => {
                if(err){
                    console.log(err)
                }
            })
        }

        res.status(200).json({ msg: "Файл сохранён", url: filename.originalname })
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}
