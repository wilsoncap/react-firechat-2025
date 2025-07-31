import { Outlet } from "react-router"
// Update the import path below if 'sonner' is located elsewhere
import { Toaster } from "../components/ui/sonner"

const RootLayout = () => {
  return (
    <div>
      
      <Outlet />
      <Toaster
        position="top-right"
        richColors
      />
    </div>
  )
}
export default RootLayout