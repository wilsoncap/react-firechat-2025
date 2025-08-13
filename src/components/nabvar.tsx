

import {
LayoutDashboard,
MessageCircle,
User,
LogOut,
ClipboardCheck
} from "lucide-react"
import { NavLink } from "react-router"
import { useAuthActions } from "../hooks/use-auth.actions"
import { Button } from "./ui/button"
import { cn } from "../lib/utils"

const navigation = [
  {name: "Dashboard", href: "/admin", icon: LayoutDashboard},
  {name: "Messages", href: "/admin/chat", icon: MessageCircle},
  {name: "Profile", href: "/admin/profile", icon: User},
  {name: "Tasks", href: "/admin/tasks", icon: ClipboardCheck},
]


const Nabvar = () => {
  const {logout} = useAuthActions();
  return (
    <header className="border-b bg-card">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex flex-1">
            <div className="hidden md:flex items-center space-x-4">
              {navigation.map(item => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({isActive}) => cn(
                    "inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    isActive 
                      ? "bg-secondary text-secondary-foreground" 
                      : "text-muted-foreground"
                  )}
                  end
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            {navigation.map(item => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({isActive}) => cn(
                  "inline-flex items-center p-2 rounded-md",
                  "hover:bg-accent hover:text-accent-foreground",
                  isActive 
                    ? "bg-secondary text-secondary-foreground" 
                    : "text-muted-foreground"
                )}
                end
              >
                <item.icon className="w-5 h-5" />
                <span className="sr-only">{item.name}</span>
              </NavLink>
            ))}
          </div>

          <div className="flex items-center justify-end space-x-4">
            <Button 
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-muted-foreground hover:text-primary"
            >
              <LogOut className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Logout</span>
            </Button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Nabvar