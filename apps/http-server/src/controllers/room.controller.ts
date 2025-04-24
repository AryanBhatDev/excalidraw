import { Request, Response } from "express";
import { roomService } from "../services/room.service";
import { RoomSchema } from "@repo/utils/zod";
import { prisma } from "@repo/db/client";

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

const getChats = async(req:Request,res:Response):Promise<void>=>{
    try{
        const roomId = req.params.roomId ;
    
        if(!roomId){
            throw new Error('Room id not provided')
            
        }
        
        const chats = await roomService.getChats(Number(roomId));

        res.status(200).json({
            chats
        })

    }catch(e){
        res.status(403).json({
            message: e instanceof Error? e.message :"Unauthorized"
        })
    }

}

const getRoom = async(req:Request,res:Response):Promise<void>=>{
    try{
        const slug = req.params.slug;
        if(!slug) {
            throw new Error('Slug not provided')
        }
        const room = await roomService.getRoom(slug)

        res.status(200).json({
            room
        })
    }catch(e){
        res.status(500).json({
            message:e instanceof Error ? e.message : "Unknown error"
        })
    }
    


}

export { roomEnter, getChats, getRoom }