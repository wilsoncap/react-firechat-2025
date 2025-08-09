import type { Room } from "../schemas/room.schema";
import { collection, query, where } from "firebase/firestore";
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

  return {
    rooms: rooms as Room[],
  };
};
