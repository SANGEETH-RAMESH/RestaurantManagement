import { Request,Response,NextFunction } from "express";
import { ValidationError } from "yup";

export const validate = (schema:any) =>{
    return  async(req:Request,res:Response,next:NextFunction) =>{
        try {
            await schema.validate(req.body,{abortEarly:false});
            next();
        } catch (error) {
            const validationErrors:Record<string,string> = {};
            (error as ValidationError).inner.forEach(err =>{
                if(err.path) validationErrors[err.path] = err.message;
            });
            
            res.status(400).json({
                success:false,
                message:"Validation Failed",
                errors:validationErrors
            })
        }
    }
}