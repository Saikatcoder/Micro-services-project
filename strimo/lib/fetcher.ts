import { isAxiosError } from "axios"
import httpRequest from "./http"


export const fetcher= async(url:string)=>{
    try{
       const {data} = await httpRequest.get(url)
       return data  
    }catch(err){

        if(isAxiosError(err)){
            throw new Error (err.response?.data.message || `Error fetching data from ${url}: ${err.message}`)
        }
        
        if(err instanceof Error){
            throw new Error(`Error fetching data from ${url}: ${err.message}`)
        }
    }
}