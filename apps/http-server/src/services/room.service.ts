import { prisma } from "@repo/db/client";


class RoomService{
    async roomEnter(name:string,id:string):Promise<number>{
        const isUser = await prisma.user.findFirst({
            where:{
                id
            }
        })
        if(!isUser){
            throw new Error('User not found')
        }
        const createdRoom = await prisma.room.create({
            data:{
                slug: name,
                adminId:id
            }
        })

        return createdRoom.id
    }

    async getChats(roomId:number){
        const messages = await prisma.chat.findMany({
            where:{
                roomId
            },
            orderBy:{
                id:'desc'
            },
            take:50
        })
        return messages;
    }
}

export const roomService = new RoomService();