import { IOtp } from "../../model/otpModel";
import { IRestaurant } from "../../model/restaurantModel";
import { IUser } from "../../model/userModel";

export interface IUserService{
    signUp(userData:Partial<IUser>):Promise<string>,
    verifySignUpOtp(data:Partial<IOtp>):Promise<string>,
    resendOtp(userData:Partial<IUser>):Promise<string>,
    verifyLogin(userData:Partial<IUser>):Promise<{message:string,accessToken?:string,refreshToken?:string}>,
    addRestaurant(data:IRestaurant):Promise<string>,
    getRestaurant():Promise<IRestaurant[] | string>,
    getRestaurantById(id:string):Promise<IRestaurant | null | string>,
    updateRestaurant(id:string,data:IRestaurant):Promise<string>,
    deleteRestaurant(id:string):Promise<string>
}