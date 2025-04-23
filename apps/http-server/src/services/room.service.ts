import { prisma } from "@repo/db/client";


class RoomService{
    async roomEnter(id:string):Promise<string>{
        const isUser = await prisma.user.findFirst({
            where:{
                id
            }
        })
        if(!isUser){
            throw new Error('User not found')
        }
        const roomId = (Math.random()*1000000).toString();

        return roomId
    }
}

export const roomService = new RoomService();