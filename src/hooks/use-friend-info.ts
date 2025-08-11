import type { UserFirestore } from "../schemas/user.schema";
import { doc } from "firebase/firestore";
import { useFirestore, useFirestoreDocData } from "reactfire";

export const useFriendInfo = (friendUID: string) => {// recibe un uid en string
  const db = useFirestore();// conexion a firestore

  const friendDocRef = doc(db, "users", friendUID);//concexion a la tabla user y busque por el uid=>key y trae un doc

  const { data: friend } = useFirestoreDocData(friendDocRef, {// ejecuta la query y la guarda en una variable friend
    idField: "uid",//traernos el uid de ese documento
    suspense: true,
  });

  return {
    friend: friend as UserFirestore,
  };
};