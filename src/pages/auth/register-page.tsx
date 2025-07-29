import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "reactfire";

const RegisterPage = () => {

  const auth = useAuth();

  const handleGoogleSignIn = async() => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      console.log('user signed in with Google is successful');
    } catch (error) {
      console.log('Error signing in with Google:', error);
      
    }
    
  }
  return (
    <div>
      <h1>RegisterPage</h1>
      <button onClick={handleGoogleSignIn}>Sing In Google</button>
    </div>
  )
}
export default RegisterPage