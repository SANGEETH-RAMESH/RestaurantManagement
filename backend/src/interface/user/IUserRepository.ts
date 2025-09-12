import { IOtp } from "../../model/otpModel";
import { IRestaurant } from "../../model/restaurantModel";
import { IUser } from "../../model/userModel";

export interface IUserRepository{
    createUser(userData: Partial<IUser>): Promise<string>,
    createOtp(otp: number, email: string): Promise<string>,
    findOtpByEmail(email:string):Promise<IOtp | null>,
    findUserByEmail(email:string):Promise<IUser | null>,
    verifyUser(email:string):Promise<void>,
    
}