import { body } from 'express-validator'

export const validationLogin = [
    body('email', 'Неверный email или пароль').isEmail(),
    body('password', 'Неверный email или пароль').isLength({ min: 6 })
]

export const validationRegister = [
    body('fullName', 'Имя слишком короткое').isString().isLength({ min: 3 }),
    body('password', 'Неверный email или пароль').isLength({ min: 6 }),
    body('email', 'Неверный email или пароль').isEmail(),
    body('avatar', 'Аватар не загружен').optional().isURL()
]