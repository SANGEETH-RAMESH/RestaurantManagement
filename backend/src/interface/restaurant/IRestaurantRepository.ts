import { IRestaurant } from "../../model/restaurantModel";


export interface IRestaurantRepository {
    createRestaurant(data: IRestaurant): Promise<string>,
    getRestaurant(userId:string): Promise<IRestaurant[] | string>,
    getRestaurantById(id: string): Promise<IRestaurant | null | string>,
    updateRestaurant(id:string,data:IRestaurant):Promise<string>,
    deleteRestaurant(id:string):Promise<string>
}