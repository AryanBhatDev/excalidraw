"use client"

import { useEffect, useState } from "react";

import { Canvas } from "./Canvas";


export default function RoomCanvas({roomId}:{roomId:string}){

    const [socket,setSocket] = useState<WebSocket | null>(null);

    useEffect(()=>{
        const ws = new WebSocket('ws://localhost:8081');
        ws.onopen = () =>{
            setSocket(ws);
            ws.send(JSON.stringify({
                type:"join_room",
                roomId
            }))
        }
    },[])


    if (!socket){
        return <div>
            Connecting to server ....
        </div>
    }

    return <div>
        <Canvas roomId={roomId} socket = {socket} />
    </div>
}