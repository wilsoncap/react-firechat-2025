import { updateProfile } from "firebase/auth";
import { useState } from "react"
import { useUser } from "reactfire";
import { useUserActions } from "./use-ser-actions";

export const useProfileActions = () => {

    const [loading, setLoading] = useState(false);
    const {data: user} = useUser()
    const {createOrUpdateUser} = useUserActions()

    const updateUserProfile = async (data: {
        displayName?: string,
        photoUrl?: string
    }) =>{

        if (!user) {
            throw new Error('User is not authenticated')
        }

        setLoading(true)
        try {
            await updateProfile(user, {
                displayName: data.displayName || user.displayName,
                photoURL: data.photoUrl || user.photoURL
            })

            await createOrUpdateUser({
                ...user,
                ...data,
            })
            return {success: true}
        } catch (error) {
            console.error("error updating profile: ", error)
            return {success: false}
        }finally{
            setLoading(false)
        }

    }




    return {
        updateUserProfile,
        loading
    }
}