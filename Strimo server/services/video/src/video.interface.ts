import mongoose, { Document, Schema } from "mongoose"
import { VideoStatusEnum } from "./video.enum"
import { Request } from "express"

export interface VideoModelInterface extends Document {
    _id: mongoose.Types.ObjectId
    user: Schema.Types.ObjectId
    title: string
    description?: string
    size: number
    duration: number
    path: string
    status: VideoStatusEnum	
}

export interface AuthRequest extends Request {
    user?: {
        id: string,
        fullname: string,
        email: string,
        mobile: string
    }
}

export interface PaginationInterface {
    total: number
    data: any[]
}