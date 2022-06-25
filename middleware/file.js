import multer from 'multer'
import moment from 'moment'
import path from 'path'
import fs from 'fs'

const storage = multer.diskStorage({
    destination(_, __, cb) {
        if (!fs.existsSync('./uploads')) {
            fs.mkdirSync(path.join(path.resolve(), './uploads'))
        } else {
            cb(null, path.join(path.resolve(), './uploads'))
        }
    },
    filename(_, file, cb) {
        const date = moment().format('DDMMYYYY-HHmmss_SSS')
        const newName = `${date}-${file.originalname}`
        cb(null, newName)
        file.originalname = newName
    },
})

const types = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg']

const fileFilter = (_, file, cb) => {
    if (types.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

export default multer({
    storage, fileFilter, limits: {
        files: 1
    }
})
