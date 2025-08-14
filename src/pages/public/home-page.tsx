import { Link } from "react-router";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { CheckSquare, MessageSquare, UserCircle } from "lucide-react";


const HomePage = () => {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Bienvenido a WilChat
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Conéctate, colabora y crea. La plataforma definitiva para la comunicación y gestión de tareas en equipo.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/auth/register">Empezar ahora</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/auth/login">Ya tienes cuenta?</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Todo lo que necesitas, en un solo lugar</h2>
            <p className="text-muted-foreground mt-2">
              Descubre las herramientas que harán tu comunicación más fluida y tu trabajo más productivo.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Chat en Tiempo Real</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Comunícate instantáneamente con tus amigos y equipos a través de salas de chat privadas y seguras.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                  <CheckSquare className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Gestión de Tareas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Organiza tus proyectos y asigna tareas para mantener a tu equipo sincronizado y enfocado.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                  <UserCircle className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Perfiles Personalizables</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Muestra tu personalidad y mantén tu información actualizada con perfiles de usuario fáciles de gestionar.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 md:py-24 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">¿Cómo funciona?</h2>
            <p className="text-muted-foreground mt-2">
              Empezar en Wilchat es rápido y sencillo.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 bg-primary text-primary-foreground h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold">1</div>
              <p className="font-medium">Crea tu cuenta</p>
            </div>
            <div className="h-px w-16 bg-muted-foreground/20 md:w-px md:h-16"></div>
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 bg-primary text-primary-foreground h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold">2</div>
              <p className="font-medium">Busca a tus amigos</p>
            </div>
            <div className="h-px w-16 bg-muted-foreground/20 md:w-px md:h-16"></div>
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 bg-primary text-primary-foreground h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold">3</div>
              <p className="font-medium">Empieza a chatear y colaborar</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Wilchat. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
