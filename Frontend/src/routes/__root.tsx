import {type QueryClient } from '@tanstack/react-query'
import {Link, Outlet,createRootRouteWithContext, useRouter } from '@tanstack/react-router'
import { Home, Info, DollarSign, PlusCircle, User } from "lucide-react"

// import { TanStackRouterDevtools } from '@tanstack/router-devtools'




interface MyRouterContext {
  queryClient: QueryClient
}


export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root
})


function Navbar() {
  const router = useRouter()

  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/about", label: "About", icon: Info },
    { to: "/expenses", label: "Expenses", icon: DollarSign },
    { to: "/create-expenses", label: "Create", icon: PlusCircle },
    { to: "/profile", label: "Profile", icon: User },
  ]

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="font-bold text-xl">MyApp</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    router.state.location.pathname === item.to
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  } transition duration-150 ease-in-out`}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
function Root(){
  return(
    <>
    <Navbar/>
    <hr />
    <Outlet />
    {/* <TanStackRouterDevtools /> */}
  </>
  )
}