import { Router } from 'express';
import { userSignup } from '../controllers/user.controller';

export const userRouter = Router();

userRouter.post('/signup',userSignup)