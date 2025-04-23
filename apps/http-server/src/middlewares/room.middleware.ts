import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const validate = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeaders = req.headers['authorization'];

        if (!authHeaders || !authHeaders.startsWith('Bearer ')) {
            throw new Error('Invalid JWT token');
        }

        const token = authHeaders.split(' ')[1];

        if (!token) {
            throw new Error('Token not present');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id:string };

        req.user = { _id: decoded.id};

        next();

    } catch (e) {
        res.status(403).json({
            message: e instanceof Error? e.message :"Unknown error"
        })
    }
};
