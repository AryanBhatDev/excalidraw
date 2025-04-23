import { Request, Response } from "express";
import { roomService } from "../services/room.service";
import { RoomSchema } from "@repo/utils/zod";

const roomEnter = async(req:Request,res:Response):Promise<void>=>{
    try{
        const data = RoomSchema.safeParse(req.body);
        if(!data.success){
            throw new Error('Incorrect room input')
        }

        const id = req?.user?._id;

        if(!id){
            throw new Error('Id is not present')
        }
        const room = await roomService.roomEnter(id);

        res.status(200).json({
            message:"Room joined",
            room
        })
    }catch(e){
        const errorMessage = e instanceof Error ? e.message : "Unknown Error. Please try again"
        res.status(500).json({
            message:errorMessage
        })
    }
}


export { roomEnter }