import { Router } from "express"
import { NewsController } from '../controllers/index.js'
import { isValid } from "../middleware/isValid.js"
import { tokenProtection } from "../middleware/tokenProtection.js"
import { validationNewsCreate } from "../validations.js"


const router = Router()


router.get('/get', (req, res) => NewsController.getAll(req, res))
router.get('/get/:id', tokenProtection, (req, res) => NewsController.getOne(req, res))
router.delete('/remove', tokenProtection, (req, res) => NewsController.remove(req, res))
router.patch('/change', validationNewsCreate, isValid, tokenProtection, (req, res) => NewsController.change(req, res))
router.post('/create', validationNewsCreate, isValid, tokenProtection, (req, res) => NewsController.create(req, res))


export default router

