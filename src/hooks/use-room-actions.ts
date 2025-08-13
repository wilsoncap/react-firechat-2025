import type { Room } from "../schemas/room.schema";
import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";


export const useRoomActions = () => {
  const db = useFirestore();//conexion como php nativo
  const { data: user } = useUser();//usuario autenticado

  if (!user) throw new Error("Usuario no autorizado");// si no esta autenticado

  const roomRef = collection(db, "rooms");// crear la referencia de la tabla rooms

  const roomQuery = query(
    roomRef,
    where("participants", "array-contains", user.uid)// busqueda en array participants, array-containts
  );// Query apara traer la data

//   metodo que ejecuta la query, lo guardo en una variable
  const { data: rooms } = useFirestoreCollectionData(roomQuery, {
    suspense: true,
    idField: "id",
  });

// buscar un user con email
const searcUserWithEmail = async(email: string) =>{//asyncrono porque va hacer una peticion al server
  const userRef = collection(db, "users")
  const q = query(userRef, where(
    "email", "==", email
  ))

  const querySnapShop = await getDocs(q);

  if(querySnapShop.empty){
    return null
  }

  const doc = querySnapShop.docs[0]

  return doc.data()
}


const findOrCreateRoom = async(friendEmail: string) =>{
  if (!user) return {
    success: false,
    message: "401 no autorizado",
    roomId: null
  }

  if (user.email === friendEmail) return {
    success: false,
    message: "400 no te puedes bucar a ti mismo",
    roomId: null
  }

  const friend = await searcUserWithEmail(friendEmail)

  if (!friend) return {
    success: false,
    message: "404 Fiend no found",
    roomId: null
  }

  const existRoom = rooms.find(room =>(
    room.participants.find((uid:string) => uid === friend.uid)
  ))

  if (existRoom) return {
    success: true,
    message: "200 Sala encontrada",
    roomId: existRoom.id
  }

  const newRoom: Omit<Room, "id"> = {
    createdAt: serverTimestamp(),
    lastMessage: null, 
    participants: [friend.uid, user.uid]
  }

  const docRef = await addDoc(roomRef, newRoom)

  return {
    success: true,
    message: "200 Sala creada",
    roomId: docRef.id
  }
}

  return {
    rooms: rooms as Room[],
    findOrCreateRoom
  };
};
