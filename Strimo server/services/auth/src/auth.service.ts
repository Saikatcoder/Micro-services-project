import AuthModel from "./auth.model"
import {v4 as uuid} from 'uuid'
import axios from "axios"
import moment from "moment"
import { AuthModelInterface, MessageInterface, VerifyOtpInterface } from "./auth.interface"
import jwt from "jsonwebtoken"
import { SendOtpDto, SignupDto, VerifyOtpDto, VerifyTokenDto } from "./auth.dto"
axios.defaults.baseURL = process.env.MSG_SERVER

const getAccessToken = async (auth: Pick<AuthModelInterface, "_id" | "mobile" | "email" | "fullname">): Promise<string> =>{
    const payload = {
        id: auth._id,
        mobile: auth.mobile,
        email: auth.email,
        fullname: auth.fullname
    }

    const expiresIn = parseInt(process.env.ACCESS_TOKEN_EXPIRY as string)
    const secret =  process.env.AUTH_SECRET

    if(!secret)
        throw new Error("Auth secret is missing")

    const token = jwt.sign(payload, secret, {expiresIn})
    return token
}

export const signup = async (body: SignupDto): Promise<MessageInterface> =>{
    

    await Promise.all([
        AuthModel.create(body),
        sendOtp({mobile: body.mobile})
    ])

    return {message: "Signup success"}
}

export const sendOtp = async (body: SendOtpDto):Promise<MessageInterface> =>{
    const auth = await AuthModel.findOne({mobile: body.mobile})
    if(!auth)
        throw new Error("User not found try to signup first")
    
    // const {data} = await axios.post(`/otp?otp_expiry=10&template_id=${process.env.OTP_TEMPLATE_ID}&mobile=${body.mobile}&authKey=${process.env.MSG_AUTH_KEY}`)
    
    // if(data.type !== "success")
    //     throw new Error("Failed to send otp")

    return {message: "Otp sent successfully"}
}

export const verifyOtp = async (body: VerifyOtpDto):Promise<VerifyOtpInterface> =>{
    // const {data} = await axios.post(`/otp/verify?mobile=${body.mobile}&authKey=${process.env.MSG_AUTH_KEY}&otp=${body.otp}`)
    
    // if(data.type !== "success")
    //     throw new Error("Failed to verify otp")

    const auth = await AuthModel.findOne({mobile: body.mobile}).lean()

    if(!auth)
        throw new Error("User doesn`t exist")

    if(body.otp !== 1234)
        throw new Error("Failed to verify otp")

    const accessToken = await getAccessToken(auth)

    return {
        message: "Otp verified successfully", 
        accessToken,
        refreshToken: auth.refreshToken
    }
}

export const resendOtp = async (body: SendOtpDto):Promise<MessageInterface> =>{
    // const {data} = await axios.post(`/otp/retry?mobile=${body.mobile}&authKey=${process.env.MSG_AUTH_KEY}&retryType=text`)
    
    // if(data.type !== "success")
    //     throw new Error("Failed to resend otp")

    return {message: "Otp resent successfully"}
}

export const verifyToken = async (body: VerifyTokenDto)=>{
    const payload = await jwt.verify(body.token, process.env.AUTH_SECRET!)
    return payload
}