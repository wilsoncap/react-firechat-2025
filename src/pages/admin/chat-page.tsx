import { Suspense, useState } from "react"
import ListRoomChat from "../../components/chats/list-room-chat"
import MessagesChat from "../../components/chats/messages-chat"
import FormMenssageChat from "../../components/chats/form-menssage-chat"
import FormSearchFrined from "../../components/chats/form-search-friend"
import { Button } from "../../components/ui/button"
import { ArrowLeft } from "lucide-react"

const ChatPage = () => {
  const [roomId, setRoomId] = useState("")
  const [showConversations, setShowConversations] = useState(true)
  const handleClickRoomId = (id: string) =>{
    setRoomId(id)
    setShowConversations(false)
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col md:flex-row gap-4 p-4">
      <section className={`md:w-1/3 lg:w-1/4 border rounded-lg shadow-sm h-full overflow-hidden flex flex-col transition-all
        ${!showConversations ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b">
          <Suspense fallback={"Cargando búsqueda..."}>
            <FormSearchFrined handleClickRoomId={handleClickRoomId}/>
          </Suspense>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <Suspense fallback={"Cargando rooms..."}>
            <ListRoomChat handleClickRoomId={handleClickRoomId}/>
          </Suspense>
        </div>
      </section>

      <section className={`md:w-2/3 lg:w-3/4 border rounded-lg shadow-sm h-full flex flex-col
        ${showConversations ? 'hidden md:flex' : 'flex'}`}>
        {roomId ? (
          <Suspense fallback={<div className="flex-1 flex items-center justify-center">Cargando chats de la sala...</div>}>
            <div className="flex flex-col h-full">
              <div className="p-4 border-b flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="md:hidden"
                  onClick={() => {
                    setShowConversations(true)
                    setRoomId("")
                  }}
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <span className="font-medium">Chat</span>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <MessagesChat roomId={roomId} />
              </div>
              <div className="border-t p-4">
                <FormMenssageChat roomId={roomId} />
              </div>
            </div>
          </Suspense>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Selecciona una sala para chatear
          </div>
        )}
      </section>
    </div>
  )
}
export default ChatPage