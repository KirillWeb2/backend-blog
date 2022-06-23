import { Router } from "express"
import { AuthController } from '../controllers/index.js'
import { validationLogin, validationRegister } from '../validations.js'
import { isValid } from '../middleware/isValid.js'

const router = Router()

router.post('/register', validationRegister, isValid, (req, res) => AuthController.register(req, res))
router.post('/login', validationLogin, isValid, (req, res) => AuthController.login(req, res))

export default router

