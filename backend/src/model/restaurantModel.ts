import mongoose, { Document , Schema } from "mongoose";




export interface IRestaurant extends Document{
    userId:mongoose.Schema.Types.ObjectId,
    name:string,
    address:string,
    phone:number,
    email:string,
    hours:number, 
    cuisine:string,
    image:string[]
}

const restaurantSchema:Schema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    name:{
        type:String
    },
    address:{
        type:String,
    },
    phone:{
        type:Number,
    },
    email:{
        type:String
    },
    hours:{
        type:Number,
    },
    cuisine:{
        type:String
    },
    image:{
        type:[String]
    }
})

const Restaurant = mongoose.model<IRestaurant>("Restaurant",restaurantSchema);

export default Restaurant;