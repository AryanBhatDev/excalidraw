import { Router } from 'express';
import { roomEnter } from '../controllers/room.controller';


export const roomRouter = Router();

roomRouter.post('/',roomEnter)