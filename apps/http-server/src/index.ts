import express, { Request, Response } from 'express';
import { userRouter } from './routes/user.route';

const app = express();

app.use(express.json());

app.use('/api/v1/user',userRouter);

app.listen(3001);