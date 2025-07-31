import { toast } from "sonner"
import { Card, CardContent, CardDescription,CardHeader, CardTitle } from "../../components/ui/card"
import { useAuthActions } from "../../hooks/use-auth.actions"
import CardFooterAuth from "../../components/card-footer-uath"

const LoginPage = () => {
  const {loginWithgoogle, loading} = useAuthActions()// del hook

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
        <CardFooterAuth 
        type="login"
        loading={loading}
        />
      </CardHeader>
    </Card>
  )
}
export default LoginPage