import express from 'express';

import UserController from '../controller/userController';
import UserService from '../service/userService';
import UserRepository from '../repository/userRepository';
import RestaurantRepository from '../repository/restaurantRepository';
import authMiddleware from '../middleware/authMiddleware';
import upload from '../cloudinary/multer';
import {validate} from '../middleware/validateMiddleware';
import { signInValidation, signUpValidation } from '../validation/commonValidation';
import { otpValidation } from '../validation/otpValidation';

const user_route = express.Router();


const userRepository = new UserRepository();
const restaurantRepository = new RestaurantRepository();
const userService = new UserService(userRepository,restaurantRepository);
const userController = new UserController(userService);

user_route.post('/auth/signup',validate(signUpValidation),userController.signUp.bind(userController));

user_route.post('/auth/verify-signup-otp',validate(otpValidation),userController.verifySignUpOtp.bind(userController));

user_route.post('/auth/resend-otp',userController.resendOtp.bind(userController));

user_route.post('/auth/verify-login',validate(signInValidation),userController.verifyLogin.bind(userController));

user_route.post('/addrestaurant',upload.single('photos'),authMiddleware,userController.addRestuarant.bind(userController));


user_route.get('/restaurant/:id',userController.getRestaurantById.bind(userController));

user_route.put('/restaurant/:id',userController.updateRestaurant.bind(userController));

user_route.delete('/restaurant/:id',userController.deleteRestaurant.bind(userController));

user_route.get('/restaurant',userController.getRestaurant.bind(userController));


export default user_route;