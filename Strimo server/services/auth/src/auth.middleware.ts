import { Request, Response } from "express";
import { NextFunction } from "http-proxy-middleware/dist/types";

export const DtoMiddleware = (schema: any)=>(req: Request, res: Response, next: NextFunction)=>{
    const result = schema.safeParse(req.body)
    
    if(!result.success)
    {
        res.status(400).json({message: "Validation failed", errors: result.error.format()})
        return
    }

    req.body = result.data
    next()
}

export const IscMiddleware = (req: Request, res: Response, next: NextFunction)=>{
    try {
        const apiKey = req.headers['x-api-key']
    
        if(!apiKey)
            throw new Error("Unauthorized")
    
        if(apiKey !== process.env.API_KEY)
            throw new Error("Unauthorized")
    
        next()
    }
    catch(err)
    {
        if(err instanceof Error)
            res.status(401).json({message: "Unauthorized"})
    }
}