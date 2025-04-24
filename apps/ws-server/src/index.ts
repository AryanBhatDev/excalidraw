import { WebSocket, WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import path from 'path';
import { prisma } from '@repo/db/client';

dotenv.config({path:path.resolve(__dirname,'../../../.env')})

const wss = new WebSocketServer({ port: 8081 });

interface User {
    socket: WebSocket;
    rooms: string[];
    userId: string;
}

const users: User[] = [];

function checkUser(token: string): string | null {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (typeof decoded == 'string') {
            return null;
        }

        if (!decoded || !decoded.id) {
            return null;
        }
        return decoded.id;

    } catch (e) {
        return null;
    }
}

wss.on('connection', (socket, request)=> {
    const url = request.url;
    if (!url) {
        return;
    }
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token') || '';
    const userId = checkUser(token);

    if (userId == null) {
        socket.close();
        return null;
    }
    users.push({
        userId,
        rooms: [],
        socket,
    });

    socket.on('message', async(data)=> {
        let parsedData;
        if (typeof data !== 'string') {
            parsedData = JSON.parse(data.toString());
        } else {
            parsedData = JSON.parse(data);
        }

        if (parsedData.type === 'join_room') {
            const user = users.find((x) => x.socket === socket);
            user?.rooms.push(parsedData.roomId);
        }

        if (parsedData.type === 'leave_room') {
            const user = users.find((x) => x.socket === socket);
            if (!user) {
                return;
            }
            user.rooms = user?.rooms.filter((x) => x === parsedData.room);
        }


        if (parsedData.type === 'chat') {
            const roomId = parsedData.roomId;
            const message = parsedData.message;

            await prisma.chat.create({
                data: {
                    roomId: Number(roomId),
                    message,
                    userId,
                },
            });

            users.forEach((user) => {
                if (user.rooms.includes(roomId)) {
                    user.socket.send(
                        JSON.stringify({
                            type: 'chat',
                            message: message,
                            roomId,
                        })
                    );
                }
            });
        }
    });
});
