import { Router } from "express"
import { FileController } from '../controllers/index.js'
import { tokenProtection } from "../middleware/tokenProtection.js"
import upload from '../middleware/file.js'

const router = Router()

router.post('/:name', tokenProtection, upload.array('file'), (req, res) => FileController.file(req, res))


export default router
