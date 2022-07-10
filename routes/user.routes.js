import { Router } from "express"
import { tokenProtection } from "../middleware/tokenProtection.js"
import { UserController } from "../controllers/index.js"
import { validationChangeUser } from "../validations.js"
import { isValid } from "../middleware/isValid.js"

const router = Router()

router.get('/users', (req, res) => UserController.allUsers(req, res))
router.get('/posts/:id', (req, res) => UserController.posts(req, res))
router.patch('/change', tokenProtection, validationChangeUser, isValid, (req, res) => UserController.change(req, res))
router.delete('/remove/:id', tokenProtection, (req, res) => UserController.remove(req, res))


export default router
