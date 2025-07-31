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
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full">
        <Outlet />
      </div>
    </div>
  )
}
export default AuthLayout