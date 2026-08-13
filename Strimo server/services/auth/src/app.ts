import dotenv from "dotenv"
dotenv.config()

import mongoose from "mongoose"
mongoose.connect(process.env.DB!)
.then(()=>console.log("auth - Database is running"))
.catch(()=>console.log("auth - Failed to connect with database"))

import express, { Request, Response } from "express"
import cookieParser from 'cookie-parser'
import AuthRouter from "./auth.router"
import morgan from "morgan"
import cors from "cors"
const app = express()
app.listen(process.env.PORT, ()=>console.log("auth service is running on - http://localhost:4001/auth"))

app.use(cors({
  origin: process.env.CLIENT,
  credentials: true,
}));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/auth", AuthRouter);
