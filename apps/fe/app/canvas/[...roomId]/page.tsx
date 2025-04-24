import RoomCanvas from "@/app/components/RoomCanvas";


export default async function Canvas({params}:{params:{
    roomId:string
}}){
    const roomId = (await params).roomId;

    console.log(roomId);
    if(!roomId) return;

    return <RoomCanvas roomId={roomId} />
    
}