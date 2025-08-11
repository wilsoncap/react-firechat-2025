import { useUser } from "reactfire"
import type { Message } from "../../schemas/room.schema"
import FriendEmail from "./friend-email"
import { cn } from "../../lib/utils"
import { Suspense } from "react"

interface Props {
    message: Message
}

const MessageChat = ({message}: Props) => {
  const {data: user} = useUser()
  const isFriend = user?.uid !== message.senderId
  return (
    <div className={
      cn(
        "max-w-[150px] p-2 rounded",
        isFriend ? "bg-pink-300" : "bg-green-300 ml-auto"
      )
    }>
        {message.text}
        <p className="truncate text-xs">
          {
            isFriend ? (
              <Suspense fallback={<div>Cargando user info</div>}>
                <FriendEmail  friendUID={message.senderId} />
              </Suspense>
            ) : user.email
          }
        </p>
    </div>
  )
}

export default MessageChat