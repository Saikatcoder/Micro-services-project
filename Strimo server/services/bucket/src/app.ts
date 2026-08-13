import dotenv from "dotenv"
dotenv.config()

import mongoose from "mongoose"
mongoose.connect(process.env.DB!)
.then(()=>console.log("bucket - Database is running"))
.catch(()=>console.log("bucket - Failed to connect with database"))

import express, { Request, Response } from "express"
import BucketRouter from "./bucket.router"
import morgan from "morgan"
import cors from "cors"
const app = express()
app.listen(process.env.PORT, ()=>console.log("bucket service is running on - http://localhost:4003/bucket"))

app.use(cors({
	origin: process.env.CLIENT,
	credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/bucket", BucketRouter)