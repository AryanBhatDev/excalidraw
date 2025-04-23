import { Request, Response } from "express";
import { userService } from "../services/user.service";

const userSignup = async(req:Request,res:Response):Promise<void>=>{
    try{
        await userService.userSignup(req.body);
        res.status(201).json({
            message:"User signup successful"
        })
    }catch(e){
        const errorMessage = e instanceof Error ? e.message : "Unknown Error. Please try again"
        res.status(500).json({
            message:errorMessage
        })
    }
}


export { userSignup }