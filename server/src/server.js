import express from 'express'
import 'dotenv/config'
import connectingDb from './config/Db.js'
import cors from "cors"
const PORT = process.env.PORT || 4000

const app = express()

app.use(express.json())
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
)

connectingDb().then(() => {
    app.listen(PORT, async (req, res) => {
        try {
            console.log(`Server is running on port ${PORT}`)
        } catch (error) {
            console.error(`Error starting server: ${error.message}`)
        }
    })
})
