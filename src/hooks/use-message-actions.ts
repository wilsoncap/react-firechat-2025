import {
  addDoc,
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";
import type { LastMessage, Message } from "../schemas/room.schema";

//servicio, solo devuleve los mensajes
export const useMessageActions = (roomId: string) => {//recibe el id de la sala
  const {data: user} = useUser();
  const db = useFirestore();//creo la referncia de la tabla de firestore

  const messageRef = collection(db, "rooms", roomId, "messages");// room y por el roomId la coleccion messages

  const messageQuery = query(messageRef, orderBy("timestamp", "asc"));//query para tarer los datos ordenados

  // ejecuta la query en suspense
  const { data: messages } = useFirestoreCollectionData(messageQuery, {
    suspense: true,
    idField: "id",
  });


  const sendMessage = async(text: string) => {
    if (!user) throw new Error("useMeesageActions: 401")
    
    
    const timestamp = serverTimestamp();

    // crear mensaje
    // Usar Omit para excluir 'id' al crear el mensaje
    const messageData: Omit<Message, "id"> = {// omite de la interface el id
      text: text.trim(),
      senderId: user.uid,
      timestamp,
    };

    // actualizar lastMessage en el room
    const roomDocumentRef = doc(db, "rooms", roomId);

    const lastMessage: LastMessage = {
      senderId: user.uid,
      text: text.trim(),
      timestamp,
    };

    // toama una array de todoas las promesas
    await Promise.all([
      addDoc(messageRef, messageData),
      updateDoc(roomDocumentRef, { lastMessage }),
    ]);
  }

  return { 
    messages: messages as Message[],
    sendMessage
 };
};