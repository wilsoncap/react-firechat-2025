import  { useUser } from "reactfire"
import type { Room } from "../../schemas/room.schema"
import FriendEmail from "./friend-email";
import { useFriendInfo } from "../../hooks/use-friend-info";

interface Props {
  room : Room,
  handleClickRoomId: (id: string) => void
}

const RoomChat = ({room,handleClickRoomId}: Props) => {
  const {data: user} = useUser();
  const friendUID = room.participants.find((id) => id !== user?.uid) || "";
  const {friend} = useFriendInfo(friendUID)
  console.log('friend', friend.photoUrl);

  return (
    // <Button variant={""} onClick={() => handleClickRoomId(room.id)}>
    // </Button>
      <div className="flex items-center gap-3 pb-2 border-b-2 cursor-pointer" onClick={() => handleClickRoomId(room.id)}>

        {
          friend.photoUrl?.includes('googleusercontent') 
          ? <img 
            src={friend.photoUrl} 
            alt={`Foto de perfil de ${friend.displayName}`} 
            className="w-9 h-9 rounded-full object-cover"
          />
          : <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 bg-blue-400 rounded-3xl p-1"  viewBox="0 0 256 256"><path fill="currentColor" d="M230.93 220a8 8 0 0 1-6.93 4H32a8 8 0 0 1-6.92-12c15.23-26.33 38.7-45.21 66.09-54.16a72 72 0 1 1 73.66 0c27.39 8.95 50.86 27.83 66.09 54.16a8 8 0 0 1 .01 8"/></svg>
        }

        
        <div>
          <p>
            <FriendEmail friendUID={friendUID} />
          </p>
        </div>
        <hr />
      </div>
  )
}

export default RoomChat