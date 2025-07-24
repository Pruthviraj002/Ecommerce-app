import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import morgan from 'morgan'
import authRouter from './routes/authRoute.js'


dotenv.config()

//db con
connectDB()

const app = express()

app.use(express.json())
app.use(morgan('dev'))


app.use('/api/v1/auth', authRouter)

app.get("/", (req, res) => {
    res.send("home")
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`server running on ${process.env.DEV} mode on port ${PORT}`.bgCyan.white);
})
