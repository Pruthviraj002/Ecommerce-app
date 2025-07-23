import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.get("/", (req, res) => {
    res.send("home")
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`server running on ${process.env.DEV} mode on port ${PORT}`.bgCyan.white);
})
