import { Request, Response } from "express";
import { userService } from "../services/user.service";
import { UserSigninSchema, UserSignupSchema } from "@repo/utils/zod";

const userSignup = async(req:Request,res:Response):Promise<void>=>{
    try{
        const validatedPayload = UserSignupSchema.safeParse(req.body);

        if(!validatedPayload.success){
            throw new Error('Invalid inputs')
        }

        await userService.userSignup(validatedPayload.data);
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

const userSignin = async(req:Request,res:Response):Promise<void>=>{
    try{
        const validatedPayload = UserSigninSchema.safeParse(req.body);

        if(!validatedPayload.success){
            throw new Error('Invalid inputs')
        }

        const token = await userService.userSignin(validatedPayload.data);
        res.status(200).json({
            message:"User signin successful",
            token
        })
    }catch(e){
        const errorMessage = e instanceof Error ? e.message : "Unknown Error. Please try again"
        res.status(500).json({
            message:errorMessage
        })
    }
}



export { userSignup,userSignin }