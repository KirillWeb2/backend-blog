import { Router } from "express"
import { postController } from '../controllers/index.js'
import { isValid } from "../middleware/isValid.js"
import { tokenProtection } from "../middleware/tokenProtection.js"
import { validationPostCreate } from "../validations.js"


const router = Router()


router.get('/get', (req, res) => postController.getAll(req, res))
router.get('/get/popular', (req, res) => postController.getPopular(req, res))
router.get('/get/tags', (req, res) => postController.getTags(req, res))
router.get('/get/:id', (req, res) => postController.getOne(req, res))
router.delete('/remove/:id', tokenProtection, (req, res) => postController.remove(req, res))
router.patch('/change', validationPostCreate, isValid, tokenProtection, (req, res) => postController.change(req, res))
router.post('/create', validationPostCreate, isValid, tokenProtection, (req, res) => postController.create(req, res))


export default router

