import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { config } from "./config/config.js"
import Routes from './routes/index.js'

const app = express()

const port = process.env.PORT || config.port

app.use(cors())
app.use(express.json())

app.use('/uploads', express.static('./uploads'))
app.use('/api/auth', Routes.Auth)
app.use('/api/news', Routes.News)
app.use('/api/file/', Routes.File)

async function start() {
    try {
        app.listen(port, () => console.log(`Server started ${port} port`))
       
        await mongoose.connect(config.dbURL, () => console.log('MongoDB connected'))
        
    } catch (err) {
        console.log(err)
    }
}

start()