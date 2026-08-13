import dotenv from "dotenv"
dotenv.config()

import mongoose from "mongoose"
mongoose.connect(process.env.DB!)
.then(()=>console.log("video - Database is running"))
.catch(()=>console.log("video - Failed to connect with database"))

import express from "express"
import cookieParser from "cookie-parser"
import VideoRouter from "./video.router"
import cors from "cors"
const app = express()
app.listen(process.env.PORT, ()=>console.log(`video service is running on - :${process.env.PORT}/video`))
app.use(cors({
    origin: process.env.CLIENT,
	credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

app.use("/video", VideoRouter)