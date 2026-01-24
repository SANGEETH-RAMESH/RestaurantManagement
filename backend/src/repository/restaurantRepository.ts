import { IRestaurantRepository } from "../interface/restaurant/IRestaurantRepository";
import Restaurant, { IRestaurant } from "../model/restaurantModel";
import { BaseRepository } from "./baseRepository";



class restaurantRepository extends BaseRepository<IRestaurant> implements IRestaurantRepository {

    constructor(){
        super(Restaurant)
    }

    async createRestaurant(data: IRestaurant): Promise<string> {
        try {
            await Restaurant.create(data);
            return 'Restaurant Created';
        } catch (error) {
            return error as string;
        }
    }

    async getRestaurant(userId:string): Promise<IRestaurant[] | string> {
        try {
            return await Restaurant.find({userId:userId});
        } catch (error) {
            return error as string
        }
    }

    async getRestaurantById(id: string): Promise<IRestaurant | null | string> {
        try {
            return await Restaurant.findOne({ _id: id });
        } catch (error) {
            return error as string;
        }
    }


    async updateRestaurant(id: string, data: IRestaurant): Promise<string> {
        try {
            await Restaurant.findOneAndUpdate(
                { _id: id },
                {
                    $set: {
                        ...data
                    }
                },
                { new: true }
            );
            return "Restaurant Updated"
        } catch (error) {
            return error as string;
        }
    }

    async deleteRestaurant(id:string,userId:string):Promise<string>{
        try {
            await Restaurant.findOneAndDelete(
                {
                    _id:id,
                    userId:userId
                }
            );
            return "Restaurant Deleted";
        } catch (error) {
            return error as string;
        }
    }
}



export default restaurantRepository;