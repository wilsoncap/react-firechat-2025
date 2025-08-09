import { Suspense, useState } from "react"
import ListRoomChat from "../../components/chats/list-room-chat"
import MessagesChat from "../../components/chats/messages-chat"
import FormMenssageChat from "../../components/chats/form-menssage-chat"


const ChatPage = () => {
  const [roomId, setRoomId] = useState("")//QDI897RiaOWbcIFTo2OT
  const handleClickRoomId = (id: string) =>{
    setRoomId(id)
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <section>
      {/* mostrar rooms */}
      <Suspense fallback={<div>Cargando rooms...</div>}>
          <ListRoomChat  handleClickRoomId={handleClickRoomId}/>
      </Suspense>
      </section>

      <section>
        {/* mostrar messages */}
        {
          roomId ? (
            <Suspense fallback={<div>Cargendo chats de la sala...</div>}>
              <FormMenssageChat roomId={roomId} />
              <MessagesChat roomId={roomId} />
            </Suspense>
          ) :(
            <div>Selecciones una sala para chatear</div>
          )
        }
      </section>

    </div>
  )
}
export default ChatPage