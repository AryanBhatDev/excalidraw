import { Router } from 'express';
import { getChats, getRoom, roomEnter } from '../controllers/room.controller';
import { validate } from '../middlewares/room.middleware';


export const roomRouter = Router();

roomRouter.post('/',validate,roomEnter)
roomRouter.get('/chats/:roomId',getChats)
roomRouter.get('/slug',getRoom)