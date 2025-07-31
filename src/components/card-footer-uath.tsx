

import { Button } from './ui/button'
import { toast } from "sonner"
import { Mail } from "lucide-react";
import { CardFooter } from './ui/card'
import { useAuthActions } from '../hooks/use-auth.actions'
import { Link } from 'react-router';

interface Props {
    type: "login" | "register",
    loading: boolean
}

const CardFooterAuth = ({type, loading}: Props) => {
  
    const isLogin = type === 'login';
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
    <CardFooter className="flex flex-col items-center gap-4">
        <Button className="w-full" onClick={handleLoginWithGoogle} disabled={loading}>
        <Mail className='mr-2' />
        {isLogin ? 'Login with Google' : 'Register with Google'}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <Link to={isLogin ? "/auth/register" : "/auth/login"}>
          <Button
            variant="link"
            className="p-0 h-auto font-normal"
          >
            {isLogin ? "Register" : "Sign in"}
          </Button>
        </Link>
      </p>
    </CardFooter>
  )
}

export default CardFooterAuth