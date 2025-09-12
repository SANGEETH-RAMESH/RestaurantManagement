import { Request, Response } from "express"
import { signInValidation, signUpValidation } from "../validation/commonValidation";
import { ValidationError } from "yup";
import { IUserService } from "../interface/user/IUserService";
import { otpValidation } from "../validation/otpValidation";
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

    async addRestuarant(req: Request, res: Response): Promise<void> {
        try {
            console.log(req.body, 'Body')
            console.log((req as any).file, 'Apiff');
            let validationErrors: Record<string, string> = {};
            await restaurantValidation.validate(req.body, { abortEarly: false })
                .catch((error) => {
                    error.inner.forEach((err: ValidationError) => {
                        if (err.path) {
                            validationErrors[err.path] = err.message
                        }
                    })
                })
            console.log(req.file?.size!, 'size')
            console.log(2 * 1024 * 1024)
            if (!req.file) {
                validationErrors["image"] = "Please upload an image";
            } else {
                const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
                if (!allowedTypes.includes(req.file.mimetype)) {
                    validationErrors["image"] =
                        "Unsupported file format. Allowed: jpg, jpeg, png";
                }
                if (req.file.size > 2 * 1024 * 1024) {
                    console.log(req.file.size, "Size")
                    console.log(2 * 1024 * 1024)
                    console.log("hey")
                    validationErrors["image"] =
                        "File too large, must be less than 2MB";
                }
                console.log('heeeee')
            }
            console.log(Object.keys(validationErrors).length)
            if (Object.keys(validationErrors).length > 0) {
                res.status(400).json({
                    success: false,
                    message: "Validation Failed",
                    errors: validationErrors,
                });
                return;
            }
            let image: string | null = null;

            if (req.file?.buffer) {
                image = await uploadImage(req.file.buffer);
            }
            console.log(image, "Image");
            const data = {
                ...req.body,
                image
            }
            const response = await this._userService.addRestaurant(data);
            res.status(200).json({ message: response, success: true })
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: err.message, success: false });
        }
    }

    async getRestaurant(req: Request, res: Response): Promise<void> {
        try {
            const response = await this._userService.getRestaurant();
            res.status(200).json({ message: response, success: true });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: err.message, success: false });
        }
    }

    async getRestaurantById(req: Request, res: Response): Promise<void> {
        try {
            console.log(req.params, 'Pram')
            const id = req.params.id;
            const response = await this._userService.getRestaurantById(id);
            res.status(200).json({ message: response, success: true });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: err.message, success: false });
        }
    }

    async updateRestaurant(req: Request, res: Response): Promise<void> {
        try {
            console.log(req.body, 'Body')
            let validationErrors: Record<string, string> = {};
            await restaurantValidation.validate(req.body, { abortEarly: false })
                .catch((error) => {
                    error.inner.forEach((err: ValidationError) => {
                        if (err.path) {
                            validationErrors[err.path] = err.message
                        }
                    })
                })
            if (Object.keys(validationErrors).length > 0) {
                res.status(400).json({
                    success: false,
                    message: "Validation Failed",
                    errors: validationErrors,
                });
                return;
            }
            const id = req.params.id;
            const data = req.body;
            const response = await this._userService.updateRestaurant(id, data);
            res.status(200).json({ message: response, success: true });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: err.message, success: false });
        }
    }

    async deleteRestaurant(req: Request, res: Response): Promise<void> {
        try {
            console.log(req.params, 'Idddd');
            const id = req.params.id;
            const response = await this._userService.deleteRestaurant(id);
            res.status(200).json({ message: response, success: true });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: err.message, success: false });
        }
    }
}

export default userController