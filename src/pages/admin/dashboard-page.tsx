import { useAuth, useUser } from "reactfire";

const DashboardPage = () => {
  const auth = useAuth();
  const {data: user} = useUser();
  return (
    <div>
      <h1>Dashboard Page</h1>
      <p>Wlcome, {user?.displayName || "Guest"}</p>
      <p>Email, {user?.email || "Not provided"}</p>
      <p>User ID: {user?.uid || "Not availabled"}</p>
      <button onClick={()=> auth.signOut()}>Sing Out</button>
    </div>
  )
}
export default DashboardPage