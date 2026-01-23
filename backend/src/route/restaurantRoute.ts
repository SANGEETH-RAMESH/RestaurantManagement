import express from 'express';
import RestaurantRepository from '../repository/restaurantRepository';
import RestaurantService from '../service/restaurantService';
import RestaurantController from '../controller/restaurantController';
import upload from '../cloudinary/multer';
import authMiddleware from '../middleware/authMiddleware';
import { fileValidation } from '../middleware/fileValidationMiddleware';
import { validate } from '../middleware/validateMiddleware';
import { restaurantValidation } from '../validation/restaurantValidation';
import { CloudinaryFileService } from '../service/cloudinaryFileService'; 

const restaurant_route = express.Router();

const restaurantRepository = new RestaurantRepository();
const restaurantService = new RestaurantService(restaurantRepository);
const fileService = new CloudinaryFileService();
const restaurantController = new RestaurantController(restaurantService,fileService);


restaurant_route.post('/',upload.single('photos'),validate(restaurantValidation),fileValidation,authMiddleware,restaurantController.addRestuarant.bind(restaurantController));

restaurant_route.get('/:id',restaurantController.getRestaurantById.bind(restaurantController));

restaurant_route.put('/:id',validate(restaurantValidation),restaurantController.updateRestaurant.bind(restaurantController));

restaurant_route.delete('/:id',authMiddleware,restaurantController.deleteRestaurant.bind(restaurantController));

restaurant_route.get('/',authMiddleware,restaurantController.getRestaurant.bind(restaurantController));

export default restaurant_route;