import { IUserRepository } from "../interface/user/IUserRepository";
import Otp, { IOtp } from "../model/otpModel";
import Restaurant, { IRestaurant } from "../model/restaurantModel";
import User, { IUser } from "../model/userModel";


class userRepository implements IUserRepository {
    async createUser(userData: Partial<IUser>): Promise<string> {
        try {
            await User.create(userData);
            return "User Created";
        } catch (error) {
            return error as string;
        }
    }

    async createOtp(otp: number, email: string): Promise<string> {
        try {
            await Otp.create({email, otp});
            return "Otp Created";
        } catch (error) {
            return error as string;
        }
    }

    async findOtpByEmail(email:string):Promise<IOtp | null>{
        try {
            return await Otp.findOne({email});  
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async findUserByEmail(email:string):Promise<IUser | null>{
        try {
            return await User.findOne({email});
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async verifyUser(email:string):Promise<void>{
        try {
           await User.findOneAndUpdate(
            {email:email},
            {$set:{
                isVerified:true
            }}
           ) 
        } catch (error) {
            console.log(error);
        }
    }

    
}


export default userRepository;