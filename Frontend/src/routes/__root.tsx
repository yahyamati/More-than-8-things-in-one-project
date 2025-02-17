import {type QueryClient } from '@tanstack/react-query'
import {Link, Outlet,createRootRouteWithContext } from '@tanstack/react-router'

// import { TanStackRouterDevtools } from '@tanstack/router-devtools'




interface MyRouterContext {
  queryClient: QueryClient
}


export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root
})


function Navbar(){
  return(
    <div className="p-2 flex gap-2">
    <Link to="/" className="[&.active]:font-bold">
      Home
    </Link>{' '}
    <Link to="/about" className="[&.active]:font-bold">
      About
    </Link>
    <Link to="/expenses" className="[&.active]:font-bold">
      expenses
    </Link>
    <Link to="/create-expenses" className="[&.active]:font-bold">
    create
    </Link>
    <Link to="/profile" className="[&.active]:font-bold">
    Profile
    </Link>
  </div>
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