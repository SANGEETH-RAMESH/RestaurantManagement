import { IOtp } from "../../model/otpModel";
import { IRestaurant } from "../../model/restaurantModel";
import { IUser } from "../../model/userModel";

export interface IUserService {
    signUp(userData: Partial<IUser>): Promise<string>,
    verifySignUpOtp(data: Partial<IOtp>): Promise<string>,
    resendOtp(userData: Partial<IUser>): Promise<string>,
    verifyLogin(userData: Partial<IUser>): Promise<{ message: string, accessToken?: string, refreshToken?: string }>,
    validateRefreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string } | string>,
    getUserDetails(userId:string):Promise<IUser | string | null>
}