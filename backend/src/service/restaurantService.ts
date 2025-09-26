import { IRestaurantRepository } from "../interface/restaurant/IRestaurantRepository";
import { IRestaurantService } from "../interface/restaurant/IRestaurantService";
import { IRestaurant } from "../model/restaurantModel";


class restaurantService implements IRestaurantService{

    constructor(private _restaurantRepository:IRestaurantRepository){ }

     async addRestaurant(data: IRestaurant): Promise<string> {
            try {
                const response = await this._restaurantRepository.createRestaurant(data);
                return response;
            } catch (error) {
                return error as string;
            }
        }
    
        async getRestaurant(userId:string): Promise<IRestaurant[] | string> {
            try {
                const data = await this._restaurantRepository.getRestaurant(userId);
                return data;
            } catch (error) {
                return error as string;
            }
        }
    
        async getRestaurantById(id: string): Promise<IRestaurant | null | string> {
            try {
                const restaurant = await this._restaurantRepository.getRestaurantById(id);
                return restaurant;
            } catch (error) {
                return error as string;
            }
        }
    
        async updateRestaurant(id: string, data: IRestaurant): Promise<string> {
            try {
                const update = await this._restaurantRepository.updateRestaurant(id, data);
                return update;
            } catch (error) {
                return error as string;
            }
        }
    
        async deleteRestaurant(id:string):Promise<string>{
            try {
                const deleted = await this._restaurantRepository.deleteRestaurant(id);
                return deleted;
            } catch (error) {
                return error as string;   
            }
        }
}


export default restaurantService;