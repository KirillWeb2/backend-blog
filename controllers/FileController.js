
export const file = async (req, res) => {
    try {
        const filename = req.files[0]

        if (!filename) {
            return res.status(300).json({ msg: "Не правильный формат изображения" })
        }

        res.status(200).json({ msg: "Файл сохранён" })
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}
