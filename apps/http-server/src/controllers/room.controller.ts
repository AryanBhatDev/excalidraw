import { Request, Response } from "express";
import { roomService } from "../services/room.service";
import { RoomSchema } from "@repo/utils/zod";

const roomEnter = async(req:Request,res:Response):Promise<void>=>{
    try{
        const payload = RoomSchema.safeParse(req.body);
        if(!payload.success){
            throw new Error('Incorrect room input')
        }

        const id = req?.user?._id;

        const { data } = payload;
        if(!id){
            throw new Error('Id is not present')
        }
        const room = await roomService.roomEnter(data.name,id);

        res.status(200).json({
            message:"Room joined",
            roomId:room
        })
    }catch(e){
        const errorMessage = e instanceof Error ? e.message : "Unknown Error. Please try again"
        res.status(500).json({
            message:errorMessage
        })
    }
}


export { roomEnter }