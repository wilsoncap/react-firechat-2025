import { useMessageActions } from '../../hooks/use-message-actions'
import MessageChat from './message-chat'

interface Props {
    roomId: string
}

const MessagesChat = ({roomId}: Props) => {
  const {messages} = useMessageActions(roomId)
  return (
    <div className="flex flex-col-reverse">
      {messages.map(message => (
        <MessageChat key={message.id} message={message} />
      ))}
    </div>
  )
}

export default MessagesChat