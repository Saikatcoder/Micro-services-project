import { Schema, model } from "mongoose"
import { AuthModelInterface } from "./auth.interface"
import {v4 as uuid} from 'uuid'
import moment from "moment"

const schema = new Schema<AuthModelInterface>({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
	mobile: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String
    },
    expiredAt: {
        type: Date
    }
}, {timestamps: true})

schema.pre('save', function(next){
    this.refreshToken = uuid()
    this.expiredAt = moment().add(1, 'M').toDate()
    next()
})

schema.statics.findByMobile = function(mobile: string) {
    return this.findOne({mobile})
}

const AuthModel = model<AuthModelInterface>("Auth", schema)
export default AuthModel