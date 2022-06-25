import jwt from 'jsonwebtoken'
import { config } from '../config/config.js'

export const tokenProtection = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        
        if (!token) {
            return res.status(400).json({ msg: "Отказано в доступе" })
        }
        
        await jwt.verify(token, config.secretKey)

        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Ошибка проверки токена" })
    }
}
