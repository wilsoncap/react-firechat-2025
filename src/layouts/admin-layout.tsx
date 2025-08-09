import { Navigate } from "react-router";
import { Outlet } from "react-router"
import { useSigninCheck, useUser } from "reactfire"

import Nabvar from "../components/nabvar";
import { Suspense } from "react";

const AdminLayout = () => {
  const {status, data: sigIncheckResult, hasEmitted} = useSigninCheck();

  // mostrar un loading mientras se verifica el estado de autenticacion
  if (status === "loading" || !hasEmitted) {
    return <div>Loading...</div> 
  }
  
  //redirigir si el usaurio no esta autenticado
  if(status === 'success' && !sigIncheckResult.signedIn) {
    return <Navigate to="/auth/login" replace />
  }
  
  return (
    // carga asincronica de otro componente que tiene la carga gatillada useUser
    <Suspense fallback={<div>Loading User...</div>}>
      <AuthenticatedLayout />
    </Suspense>
  )
}
export default AdminLayout

const AuthenticatedLayout = () => {
  useUser({
    suspense: true, // Habilita el modo suspense para obtener el usuario
  });

  return (
    <div>
      <Nabvar />
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </div>
  );
};