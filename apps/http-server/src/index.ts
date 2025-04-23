import express, { NextFunction, Request, Response } from 'express';
import { userRouter } from './routes/user.route';
import { roomRouter } from './routes/room.route';

const app = express();
const port = process.env.PORT;

app.use(express.json());

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