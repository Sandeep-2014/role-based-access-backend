const dotenv = require('dotenv').config()

const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const connectMongodb = require("./config/dbConnect.config.js")
const authRoutes = require("./routes/auth.route.js")
const taskRoutes = require("./routes/task.route.js")

// console.log(signupUser)
const app = express()

// Middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: "https://role-based-access-frontend.onrender.com", // Your frontend URL
    // origin: process.env.CORS_ORIGIN,
    credentials: true, // Allow sending cookies
  }))
// console.log(process.env.PORT)


const port = process.env.PORT || 4001

connectMongodb()


app.use("/api/auth/", authRoutes)
app.use("/api/task/", taskRoutes)




app.listen(port, () => {
    console.log(`App is running on Port no : ${port}`)
})



