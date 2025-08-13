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
    <div className={cn("flex flex-col gap-1 mb-4", isFriend ? "" : "items-end")}>
      <div className={cn(
        "max-w-[280px] p-3 rounded-2xl break-words",
        isFriend 
          ? "bg-secondary text-secondary-foreground rounded-tl-none" 
          : "bg-primary text-primary-foreground rounded-tr-none"
      )}>
        {message.text}
      </div>
      <p className="text-xs text-muted-foreground px-2">
        {
          isFriend ? (
            <Suspense fallback={<span className="opacity-50">Cargando...</span>}>
              <FriendEmail friendUID={message.senderId} />
            </Suspense>
          ) : <span className="opacity-75">{user.email}</span>
        }
      </p>
    </div>
  )
}

export default MessageChat