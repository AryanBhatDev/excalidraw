import { Router } from 'express';
import { userSignin, userSignup } from '../controllers/user.controller';

export const userRouter = Router();

userRouter.post('/signup',userSignup)
userRouter.post('/signin',userSignin)