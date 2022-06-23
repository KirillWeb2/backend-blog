import { Router } from "express"
import { NewsController } from '../controllers/index.js'
import { tokenProtection } from "../middleware/tokenProtection.js"


const router = Router()

router.get('/get', (req, res) => NewsController.getAll(req, res))
router.get('/get:id', tokenProtection, (req, res) => NewsController.getOne(req, res))
router.delete('/remove', tokenProtection, (req, res) => NewsController.remove(req, res))
router.patch('/change', tokenProtection, (req, res) => NewsController.change(req, res))
router.post('/create', tokenProtection, (req, res) => NewsController.create(req, res))


export default router

