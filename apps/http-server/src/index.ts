import express, { NextFunction, Request, Response } from 'express';
import { userRouter } from './routes/user.route';
import { roomRouter } from './routes/room.route';
import dotenv from 'dotenv';
import path from 'path'
import cors from 'cors'

dotenv.config({path:path.resolve(__dirname,'../../../.env')})

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use('/api/v1/user',userRouter);
app.use('/api/v1/room',roomRouter)

app.listen(port,()=>{
   console.log(`Http server is running on port ${port}`)
});

app.use((err:Error,req:Request,res:Response,next:NextFunction)=>{
   res.status(500).json({
    message:"Internal Server Error"
   })
})