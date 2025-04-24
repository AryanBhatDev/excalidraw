import { Router } from 'express';
import { roomEnter } from '../controllers/room.controller';
import { validate } from '../middlewares/room.middleware';


export const roomRouter = Router();

roomRouter.post('/',validate,roomEnter)
roomRouter.get('/chats/:roomId',validate,roomEnter)