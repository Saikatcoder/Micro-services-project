import { message } from "antd"
import { isAxiosError } from "axios"

export const catchError = (err: unknown)=>{
   if(process.env.NEXT_PUBLIC_NODE_ENV === 'dev')
      console.log(err) 
    
   if(process.env.NEXT_PUBLIC_NODE_ENV === "dev")
        console.log(err)

    if(isAxiosError(err))
        return message.error(err.response?.data.message || "Unknown error from server")

    if(err instanceof Error)
        return message.error(err.message || "Unknown error from client")

    message.error("Unknown error")
}