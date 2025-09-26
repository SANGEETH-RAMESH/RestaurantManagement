import createUserApiClient from "../apis/apiClient";
import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URL;
const userApiClient = createUserApiClient();


console.log(apiUrl,'url')



export const signUp = (formValues: { name: string; email: string; password: string; mobile?: string }) => axios.post(`${apiUrl}/user/auth/signup`, formValues );

export const verifySignUpOtp  = (email:string,otp:number) => axios.post(`${apiUrl}/user/auth/verify-signup-otp`,{email,otp})       

export const resendOtp = (email:string,name:string,mobile:number,password:string) => axios.post(`${apiUrl}/user/auth/resend-otp`,{email,name,mobile,password});

export const login = (formData:{email:string,password:string}) => axios.post(`${apiUrl}/user/auth/verify-login`,formData);

export const addRestuarant = (formData:FormData) =>  userApiClient.post(`${apiUrl}/restaurant/`, formData,{
    headers:{
        "Content-Type":"multipart/form-data"
    }
});

export const getRestaurant = () => userApiClient.get(`${apiUrl}/restaurant`);

export const getRestaurantById = (id:string) => userApiClient.get(`${apiUrl}/restaurant/${id}`);

export const updateRestaurant = (id:string,data:FormData) => userApiClient.put(`${apiUrl}/restaurant/${id}`,data);

export const deleteRestaurant = (id:string) => userApiClient.delete(`${apiUrl}/restaurant/${id}`);