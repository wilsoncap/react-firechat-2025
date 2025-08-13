import { useFriendInfo } from "../../hooks/use-friend-info"

interface Props {
    friendUID : string
}

const FriendEmail = ({friendUID}: Props) => {
  const {friend} = useFriendInfo(friendUID)
  
  return (
    <div>
      <p className="font-bold">{friend.displayName}</p>
      <p className="text-gray-400">{friend.email}</p>
    </div>
  )
}

export default FriendEmail