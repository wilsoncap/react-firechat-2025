import type { User } from "firebase/auth"
import { useFirestore } from "reactfire"
import type { UserFirestore } from "../schemas/user.schema"
import { doc, setDoc } from "firebase/firestore"

//services and repositorys
export const useUserActions = () =>{
    const db = useFirestore()

    // method request user auth
    const createOrUpdateUser = async (user: User) =>{
        if (!user) throw new Error('Usuario no disponible')

        //conexion a la tabla en firestore    
        const userDocRef = doc(db, "users", user.uid)

        //load data
        const userData: UserFirestore = {
            email: user.email || "",
            uid: user.uid,
            displayName: user.displayName || "",
            photoUrl: user.photoURL || ""
        }

        // begin transaction to firestore
        return await setDoc(userDocRef, userData, {
            merge: true
        })
    }


    return {
        createOrUpdateUser
    }
}

