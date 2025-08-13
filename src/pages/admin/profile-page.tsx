import { useUser } from "reactfire"
import FormProfile from "../../components/profile/form-profile"

const ProfilePage = () => {
  const {data: user} = useUser()

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="animate-spin">⏳</span>
          Cargando perfil...
        </div>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto p-4 max-w-2xl space-y-6">
      <div className="flex items-center gap-4 pb-6 border-b">
        <div className="relative">
          {user.photoURL ? (
            <img 
              src={user.photoURL} 
              alt={user.displayName || "Perfil"} 
              className="w-16 h-16 rounded-full object-cover ring-2 ring-background"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-muted-foreground/10 flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-8 h-8 text-muted-foreground" 
                viewBox="0 0 256 256"
              >
                <path fill="currentColor" d="M230.93 220a8 8 0 0 1-6.93 4H32a8 8 0 0 1-6.92-12c15.23-26.33 38.7-45.21 66.09-54.16a72 72 0 1 1 73.66 0c27.39 8.95 50.86 27.83 66.09 54.16a8 8 0 0 1 .01 8"/>
              </svg>
            </div>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{user.displayName || "Mi Perfil"}</h1>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <div className="bg-card rounded-lg border shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-medium mb-4">Información del Perfil</h2>
          <FormProfile user={user}/>
        </div>
      </div>
    </div>
  )
}
export default ProfilePage