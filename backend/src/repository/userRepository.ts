import { IUserRepository } from "../interface/user/IUserRepository";
import Otp, { IOtp } from "../model/otpModel";
import User, { IUser } from "../model/userModel";
import { BaseRepository } from "./baseRepository";


class userRepository extends BaseRepository<IUser> implements IUserRepository {

    constructor(){
        super(User)
    }

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

    async findUserById(id:string):Promise<IUser | null>{
        try {
            return await User.findOne({_id:id});
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

    async getUserDetails(userId:string):Promise<IUser | string | null>{
        try {
            return await User.findOne({
                _id:userId
            })
        } catch (error) {
            return error as string
        }
    }
}


export default userRepository;