import { Navigate, Outlet } from "react-router"
import { useSigninCheck } from "reactfire";

const AuthLayout = () => {
  const {status, data: sigIncheckResult, hasEmitted} = useSigninCheck();

  // mostrar un loading mientras se verifica el estado de autenticacion
  if (status === "loading" || !hasEmitted) {
    return <div>Loading...</div>
  }

  //redirigir si el usaurio no esta autenticado
  if(status === 'success' && sigIncheckResult.signedIn) {
    return <Navigate to="/admin" replace />
  }

  return (
    <div>
      <Outlet />
    </div>
  )
}
export default AuthLayout