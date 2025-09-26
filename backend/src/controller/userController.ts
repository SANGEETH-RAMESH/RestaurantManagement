import { Request, Response } from "express"
import { ValidationError } from "yup";
import { IUserService } from "../interface/user/IUserService";
import { restaurantValidation } from "../validation/restaurantValidation";
import uploadImage from "../cloudinary/cloudinary";


class userController {
    constructor(private _userService: IUserService) { }

    async signUp(req: Request, res: Response): Promise<void> {
        try {
            const response = await this._userService.signUp(req.body);
            res.status(200).json({ success: false, message: response })
        } catch (error: unknown) {
            const err = error as Error;
            res.status(500).json({ message: err.message });
        }
    }

    async verifySignUpOtp(req: Request, res: Response): Promise<void> {
        try {
            const response = await this._userService.verifySignUpOtp(req.body);
            if (response == 'Invalid Otp') {
                res.status(400).json({ success: false, message: response })
            } else if (response == "Otp Expired") {
                res.status(410).json({ success: false, message: response })
            } else if (response === 'Otp Verified') {
                res.status(200).json({ success: false, message: response })
            }
        } catch (error: unknown) {
            const err = error as Error;
            res.status(500).json({ message: err.message });
        }
    }

    async resendOtp(req: Request, res: Response): Promise<void> {
        try {
            const response = await this._userService.resendOtp(req.body);
            if (response == 'Otp Created') {
                res.status(200).json({ message: response })
                return;
            } else if (response == 'Otp Not Created') {
                res.status(400).json({ message: response });
                return;
            }
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: err.message });
        }
    }

    async verifyLogin(req: Request, res: Response): Promise<void> {
        try {
            const response = await this._userService.verifyLogin(req.body);
            if (response.message == 'Login Successful') {
                res.status(200).json({ message: response.message, accessToken: response.accessToken, refreshToken: response.refreshToken });
                return;
            } else if (response.message == 'Invalid credentials') {
                res.status(401).json({ message: response })
                return;
            } else if (response.message == 'User not found') {
                res.status(404).json({ message: response });
                return;
            } else {
                res.status(400).json({ message: response });
            }
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: err.message });
        }
    }

    async validaterefreshToken(req: Request, res: Response): Promise<void> {
        try {
            console.log(req.body,'BOdy')
            const { refreshToken } = req.body
            const response = await this._userService.validateRefreshToken(refreshToken)
            res.status(200).json({ success: true, message: response })
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

}

export default userController