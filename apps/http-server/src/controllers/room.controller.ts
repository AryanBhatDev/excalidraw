import { Request, Response } from "express";

const roomEnter = async(req:Request,res:Response):Promise<void>=>{
    try{
        // const validatedPayload = UserSignupSchema.safeParse(req.body);
        console.log(req.body)
        // if(!validatedPayload.success){
        //     throw new Error('Invalid inputs')
        // }

        // await userService.userSignup(validatedPayload.data);
        // res.status(201).json({
        //     message:"User signup successful"
        // })
    }catch(e){
        const errorMessage = e instanceof Error ? e.message : "Unknown Error. Please try again"
        res.status(500).json({
            message:errorMessage
        })
    }
}


export { roomEnter }