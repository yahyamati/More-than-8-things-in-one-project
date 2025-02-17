import { createFileRoute, Outlet } from "@tanstack/react-router"
import {  userQueryOption } from "../lib/api"






const Login = () => {
 
  return (
    <div>
      <p>You need to log in to continue.</p>
      <a href="http://localhost:3000/api/login">Logout</a>
    </div>
  )
}



const Component = () => {

    const {user} = Route.useRouteContext();
    if (!user) {
      return <Login />
    }

    return <Outlet />
  }


  // This is the route that will be used to protect the authenticated routes
  //all components that are children of this route will be protected (folder:_authenticated)
export const Route = createFileRoute('/_authenticated')({
    beforeLoad: async ({context}) => {
      const queryClient = context.queryClient


      try {
        const data = await queryClient.fetchQuery(userQueryOption)
        return data
      }catch(e){
        console.error(e)
        return {user : null}
      }
    },

  component: Component
})