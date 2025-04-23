import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());

app.get('/',(req:Request,res:Response)=>{
    res.status(200).json({
        msg:"You are at the get endpoint of the http server"
    })
})

app.listen(3001);