import express, { NextFunction, Request, Response } from 'express';
import { userRouter } from './routes/user.route';

const app = express();

app.use(express.json());

app.use('/api/v1/user',userRouter);

app.listen(3001);

app.use((err:Error,req:Request,res:Response,next:NextFunction)=>{
   res.status(500).json({
    message:"Internal Server Error"
   })
})