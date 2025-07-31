
import { useAuthActions } from "../../hooks/use-auth.actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import CardFooterAuth from "../../components/card-footer-uath";

const RegisterPage = () => {

  const {loading} = useAuthActions()// del hook

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
        type="register"
        loading={loading}
        />
      </CardHeader>
    </Card>
  )
}
export default RegisterPage