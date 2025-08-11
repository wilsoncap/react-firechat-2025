import React from 'react'
import { useMessageActions } from '../../hooks/use-message-actions'
import MessageChat from './message-chat'

interface Props {
    roomId: string
}

const MessagesChat = ({roomId}: Props) => {
  const {messages} = useMessageActions(roomId)
  return (
    <div className='space-y-2 mt-2'>

        {
          messages.map(message => (
            <MessageChat key={message.id} message={message} />
          ))
        }
        {/* <pre>
            {
                JSON.stringify(messages, null, 2)
            }
        </pre> */}
    </div>
  )
}

export default MessagesChat