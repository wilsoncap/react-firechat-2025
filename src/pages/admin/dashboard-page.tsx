import { useUser } from "reactfire";
import { useAuthActions } from "../../hooks/use-auth.actions";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { MessageSquare, Users, CheckSquare, UserCircle } from "lucide-react";
import { Link } from "react-router";

const DashboardPage = () => {
  const {data: user} = useUser();
  const {logout} = useAuthActions();
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
          <p className="text-muted-foreground">
            Bienvenido, {user!.displayName || "Invitado"}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={logout}>
          Cerrar Sesión
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chats Activos</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 desde ayer
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contactos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +4 esta semana
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tareas Completadas</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              +2 hoy
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Perfil</CardTitle>
            <UserCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium truncate">{user!.email}</div>
            <p className="text-xs text-muted-foreground">
              ID: {user?.uid?.slice(0, 8)}...
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Card de Perfil */}
        <Card className="overflow-hidden">
          <CardHeader className="border-b p-0">
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6">
              <div className="flex items-center gap-4">
                {user?.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt="Profile" 
                    className="h-16 w-16 rounded-full border-2 border-background shadow-md"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center shadow-md">
                    <UserCircle className="h-8 w-8 text-primary" />
                  </div>
                )}
                <div className="space-y-1">
                  <CardTitle>{user?.displayName || "Usuario"}</CardTitle>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 p-6">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                <span>12 chats</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckSquare className="h-4 w-4 text-primary" />
                <span>8 tareas completadas</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="w-full" size="sm" asChild>
                <a href="/admin/profile">
                  <UserCircle className="h-4 w-4 mr-2" />
                  Editar Perfil
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Card de Accesos Rápidos */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Accesos Rápidos</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button variant="secondary" className="justify-start h-12" asChild>
              <Link to="/admin/chat" className="flex items-center">
                <div className="bg-primary/10 p-2 rounded-lg mr-4">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-medium">Chat</span>
                  <span className="text-xs text-muted-foreground">Conversa con tus contactos</span>
                </div>
              </Link>
            </Button>

            <Button variant="secondary" className="justify-start h-12" asChild>
              <Link to="/admin/tasks" className="flex items-center">
                <div className="bg-primary/10 p-2 rounded-lg mr-4">
                  <CheckSquare className="h-5 w-5 text-primary" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-medium">Tareas</span>
                  <span className="text-xs text-muted-foreground">Gestiona tus actividades</span>
                </div>
              </Link>
            </Button>

            <Button variant="secondary" className="justify-start h-12" asChild>
              <Link to="/admin/profile" className="flex items-center">
                <div className="bg-primary/10 p-2 rounded-lg mr-4">
                  <UserCircle className="h-5 w-5 text-primary" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-medium">Perfil</span>
                  <span className="text-xs text-muted-foreground">Actualiza tu información</span>
                </div>
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
export default DashboardPage