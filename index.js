import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { config } from "./config/config.js"

const app = express()

const port = process.env.PORT || 4444

app.use(cors())
app.use(express.json())

app.use('/api/auth', import('./routes/auth.routes.js'))

async function start() {
    try {
        app.listen(port, () => console.log(`Server started ${port} port`))
        
        await mongoose.connect(config.dbURL, () => console.log('MongoDB connected'))
    } catch (err) {
        console.log(err)
    }
}

start()