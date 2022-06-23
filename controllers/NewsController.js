

export const getAll = async (req, res) => {
    try {
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}

export const getOne = async (req, res) => {
    try {

    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}

export const create = async (req, res) => {
    try {
        res.status(200).json({msg: "Всё ок!"})
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}

export const change = async (req, res) => {
    try {

    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}

export const remove = async (req, res) => {
    try {

    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}
