import { toast } from "sonner"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { useAuthActions } from "../../hooks/use-auth.actions"

const LoginPage = () => {
  const {loginWithgoogle} = useAuthActions()// del hook

  const handleLoginWithGoogle = async () => {
    toast.error("login failed: ")
    const result = await loginWithgoogle();
    if (result.success) {
      console.log("Login successful");
    } else {
      console.error("Login failed:", result.error);
      toast.error("login failed: ")
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Loging</CardTitle>
        <CardDescription>
          Login to your account using email and password or loguin with Google
        </CardDescription>
        <CardContent>
          ...
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleLoginWithGoogle}>
            Loguin with handleLoginWithGoogle
          </Button>
        </CardFooter>
      </CardHeader>
    </Card>
  )
}
export default LoginPage