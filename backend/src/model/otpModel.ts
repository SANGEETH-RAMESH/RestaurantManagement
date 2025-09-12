import mongoose, { Document, Schema } from "mongoose";

export interface IOtp extends Document{
    email:string;
    otp:number;
    createdAt?:Date;
}

const otpSchema:Schema = new Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 });

const Otp = mongoose.model<IOtp>('Otp',otpSchema);

export default Otp;