import { WebSocketServer } from 'ws';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (socket, request) => {
    const url = request.url;

    if (!url) {
        return;
    }
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token');
    if (!token) {
        return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !(decoded as JwtPayload)._id) {
        socket.close();
        return;
    }

    socket.on('message', (data) => {
        socket.send('pong');
    });
});
