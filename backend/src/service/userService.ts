import { Types } from "mongoose";
import { IRestaurantRepository } from "../interface/restaurant/IRestaurantRepository";
import { IUserRepository } from "../interface/user/IUserRepository";
import { IUserService } from "../interface/user/IUserService";
import { IOtp } from "../model/otpModel";
import { IRestaurant } from "../model/restaurantModel";
import { IUser } from "../model/userModel";
import { hashPassword } from "../utils/hashPassword";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt";
import { generateOtp } from "../utils/otpGenerator";
import { sendOtp } from "../utils/sendOtp";
import bcrypt from 'bcrypt';

class userService implements IUserService {
    constructor(private _userRepository: IUserRepository, private _restaurantRepository: IRestaurantRepository) { }

    async signUp(userData: Partial<IUser>): Promise<string> {
        try {
            if (!userData.email) {
                return "No email"
            }

            if (userData.password) {
                userData.password = await hashPassword(userData.password)
            }
            const otp = generateOtp();
            await sendOtp(otp, userData.email);
            const alreadyUser = await this._userRepository.findUserByEmail(userData.email);
            console.log(alreadyUser, 'heee')
            if (!alreadyUser) {
                const user = await this._userRepository.createUser(userData);
                if (user == 'User Created') {
                    const otpData = await this._userRepository.findOtpByEmail(userData.email);
                    if (!otpData) {
                        await this._userRepository.createOtp(otp, userData.email);
                    }
                    return 'Otp Sented';
                }
            }

            return 'Otp Not Sented';
        } catch (error) {
            return error as string;
        }
    }

    async verifySignUpOtp(data: Partial<IOtp>): Promise<string> {
        try {
            if (!data || !data.email) {
                return 'No Data';
            }
            const otpData = await this._userRepository.findOtpByEmail(data.email)
            if (!otpData) {
                return "Otp Expired";
            }
            if (otpData.otp === data.otp) {
                await this._userRepository.verifyUser(data.email);
                return "Otp Verified";
            } else {
                return "Invalid Otp";
            }
        } catch (error) {
            return error as string;
        }
    }

    async resendOtp(userData: Partial<IUser>): Promise<string> {
        try {
            if (!userData || !userData.email) {
                return 'No email';
            }
            const otp = generateOtp();
            const alreadyOtp = await this._userRepository.findOtpByEmail(userData.email);
            console.log(alreadyOtp, "Otp")
            if (!alreadyOtp) {
                const createOtp = await this._userRepository.createOtp(otp, userData.email);
                if (createOtp == 'Otp Created') {
                    return "Otp Created";
                }
            }
            return "Otp Not Created";
        } catch (error) {
            return error as string;
        }
    }

    async verifyLogin(userData: Partial<IUser>): Promise<{ message: string, accessToken?: string, refreshToken?: string }> {
        try {
            if (!userData || !userData.email || !userData.password) {
                return { message: "No User" }
            }
            const user = await this._userRepository.findUserByEmail(userData.email);
            if (user) {
                const isMatch = await bcrypt.compare(userData.password, user.password);
                if (!isMatch) {
                    return { message: "Invalid credentials" };
                }

                const accessToken = generateAccessToken({ _id: user._id, email: user.email });
                const refreshToken = generateRefreshToken({ _id: user._id, email: user.email });
                return { message: "Login Successful", accessToken, refreshToken };
            }
            return { message: "User not found" }
        } catch (error) {
            return { message: error as string }
        }
    }

    async validateRefreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string } | string> {
        try {
            console.log(refreshToken)
            const decoded = verifyRefreshToken(refreshToken)
            if (typeof decoded === 'object' && decoded !== null) {
                const response = await this._userRepository.findUserById(decoded._id);
                if (!response) {
                    return "No User"
                }
                const accessToken = generateAccessToken({
                    _id: new Types.ObjectId(response._id as string),
                    email:response.email
                });
                const refreshToken = generateRefreshToken({
                    _id: new Types.ObjectId(response._id as string),
                    email:response.email
                });
                return { accessToken, refreshToken };
            }

            return "InvalidToken";
        } catch (error) {
            console.log(error)
            return error as string
        }
    }

    async getUserDetails(userId:string):Promise<IUser | string | null>{
        try {
            const userDetails = await this._userRepository.getUserDetails(userId);
            return userDetails;
            return null
        } catch (error) {
            return null
        }
    }

}

export default userService;