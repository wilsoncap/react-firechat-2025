import { Suspense, useState } from "react"
import ListRoomChat from "../../components/chats/list-room-chat"
import MessagesChat from "../../components/chats/messages-chat"
import FormMenssageChat from "../../components/chats/form-menssage-chat"
import FormSearchFrined from "../../components/chats/form-search-friend"


const ChatPage = () => {
  const [roomId, setRoomId] = useState("")//QDI897RiaOWbcIFTo2OT
  const handleClickRoomId = (id: string) =>{
    setRoomId(id)
  }
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col md:flex-row gap-4 p-4">
      <section className="md:w-1/3 lg:w-1/4 border rounded-lg shadow-sm h-full overflow-hidden flex flex-col">
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

      <section className="md:w-2/3 lg:w-3/4 border rounded-lg shadow-sm h-full flex flex-col">
        {roomId ? (
          <Suspense fallback={<div className="flex-1 flex items-center justify-center">Cargando chats de la sala...</div>}>
            <div className="flex flex-col h-full">
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