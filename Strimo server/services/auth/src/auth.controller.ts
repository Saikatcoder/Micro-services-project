import { Request, Response } from "express";
import * as authService from "./auth.service";

export const signup = async (req: Request, res: Response)=>{
    try {
        const body = req.body
        const auth = await authService.signup(body)
        res.json(auth)
    }
    catch(err)
    {
        if(err instanceof Error)
            res.status(500).json({messsage: err.message})
    }
}

export const sendOtp = async (req: Request, res: Response)=>{
    try {
        const auth = await authService.sendOtp(req.body)
        res.json(auth)
    }
    catch(err)
    {
        if(err instanceof Error)
        {
            res.status(500).json({message: err.message})
        }
    }
}

export const verifyOtp = async (req: Request, res: Response)=>{
    try {
        const auth = await authService.verifyOtp(req.body)
        res.cookie("accessToken", auth.accessToken, {
            httpOnly: true,
            maxAge: parseInt(process.env.ACCESS_TOKEN_EXPIRY as string),
            domain: process.env.CLIENT_DOMAIN,
            secure: process.env.NODE_ENV === "dev" ? false : true,
            sameSite: false
        })
        res.cookie("refreshToken", auth.refreshToken, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            domain: process.env.CLIENT_DOMAIN,
            secure: process.env.NODE_ENV === "dev" ? false : true,
            sameSite: false
        })
        res.json({message: 'Login success'})
    }
    catch(err)
    {
        if(err instanceof Error)
        {
            res.status(500).json({message: err.message})
        }
    }
}

export const resendOtp = async (req: Request, res: Response)=>{
    try {
        const auth = await authService.resendOtp(req.body)
        res.json(auth)
    }
    catch(err)
    {
        if(err instanceof Error)
        {
            res.status(500).json({message: err.message})
        }
    }
}

export const verifyToken = async (req: Request, res: Response)=>{
    try {
        const auth = await authService.verifyToken(req.body)
        res.json(auth)
    }
    catch(err)
    {
        if(err instanceof Error)
        {
            res.status(500).json({message: err.message})
        }
    }
}