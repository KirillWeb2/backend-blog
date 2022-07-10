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

export const validationPostCreate = [
    body('title', 'Минимальная длина заголовка 3, максимальная 100').isString().isLength({ min: 3, max: 100 }),
    body('text', 'Минимальная длина текста 3, максимальная 3000').isLength({ min: 3 }),
    body('img', 'Картинка не является строкой').isString()
]

export const validationChangeUser = [
    body('fullName', 'Имя слишком короткое').isString().isLength({ min: 3 }),
    body('password', 'Неверный email или пароль').isLength({ min: 6 }),
    body('email', 'Неверный email или пароль').isEmail()
]