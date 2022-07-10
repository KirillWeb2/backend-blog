import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import Routes from './routes/index.js'
import { config } from "./config/config.js"

const app = express()

const port = process.env.PORT || config.port

app.use(cors())
app.use(express.json())

app.use('/uploads', express.static('./uploads'))
app.use('/api/auth', Routes.Auth)
app.use('/api/post', Routes.Post)
app.use('/api/file/', Routes.File)
app.use('/api/user/', Routes.User)

async function start() {
    try {
        app.listen(port, () => console.log(`Server started ${port} port`))
       
        await mongoose.connect(config.dbURL, () => console.log('MongoDB connected'))
        
    } catch (err) {
        console.log(err)
    }
}

start()