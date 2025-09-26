import { Request, Response } from "express"
import { IRestaurantService } from "../interface/restaurant/IRestaurantService";
import { IFileService } from "../interface/file/IFileService";

class restaurantController{

    constructor(private _restaurantService:IRestaurantService,private _fileService:IFileService){}
    
    async addRestuarant(req: Request, res: Response): Promise<void> {
        try {
        
            let image: string | null = null;

            if (req.file?.buffer) {
                image = await this._fileService.uploadFile(req.file.buffer);
            }
            
            if(!req.user){
                res.status(400).json({message:"No user"});
                return;
            }
            const userId = req?.user._id;
            const data = {
                ...req.body,
                image,
                userId
            }
            const response = await this._restaurantService.addRestaurant(data);
            res.status(200).json({ message: response, success: true })
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: err.message, success: false });
        }
    }

    async getRestaurant(req: Request, res: Response): Promise<void> {
        try {
            console.log(req.user,'User')
            if(!req.user){
                res.status(400).json({message:"No user"});
                return;
            }
            const userId = req?.user._id;
            console.log(userId,'Userid')
            const response = await this._restaurantService.getRestaurant(userId);
            res.status(200).json({ message: response, success: true });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: err.message, success: false });
        }
    }

    async getRestaurantById(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const response = await this._restaurantService.getRestaurantById(id);
            res.status(200).json({ message: response, success: true });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: err.message, success: false });
        }
    }

    async updateRestaurant(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const data = req.body;
            const response = await this._restaurantService.updateRestaurant(id, data);
            res.status(200).json({ message: response, success: true });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: err.message, success: false });
        }
    }

    async deleteRestaurant(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const response = await this._restaurantService.deleteRestaurant(id);
            res.status(200).json({ message: response, success: true });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: err.message, success: false });
        }
    }
}

export default restaurantController;