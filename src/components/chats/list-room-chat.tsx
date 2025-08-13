import { useRoomActions } from "../../hooks/use-room-actions"
import RoomChat from "./room-chat";

interface Props {
    handleClickRoomId: (id: string) => void
}


const ListRoomChat = ({handleClickRoomId}: Props) => {
  const {rooms} = useRoomActions();
  return (
    <div >
        {
            rooms.map((room)=>(
                // <Button key={room.id} onClick={()=>handleClickRoomId(room.id)}>{room.id}</Button>
                // <RoomChat key={room.id}  room={room} handleClickRoomId={handleClickRoomId}/>
                <div key={room.id} className="py-2 hover:bg-blue-200">
                <RoomChat room={room} handleClickRoomId={handleClickRoomId} />
                </div>
                
            ))
        }
    </div>
  )
}

export default ListRoomChat