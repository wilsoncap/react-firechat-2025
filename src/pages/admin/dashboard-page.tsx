import { useUser } from "reactfire";
import { useAuthActions } from "../../hooks/use-auth.actions";
import { Button } from "../../components/ui/button";

const DashboardPage = () => {
  const {data: user} = useUser();
  const {logout} = useAuthActions();
  return (
    <div className="container mx-auto p-4">
      <h1>Dashboard Page</h1>
      <p>Wlcome, {user!.displayName || "Guest"}</p>
      <p>Email, {user!.email || "Not provided"}</p>
      <p>User ID: {user?.uid || "Not availabled"}</p>
      <Button variant={"destructive"} onClick={logout}>Sing Out</Button>
    </div>
  )
}
export default DashboardPage