import { createFileRoute, Link, Outlet } from "@tanstack/react-router"
import {  userQueryOption } from "../lib/api"
import { Button } from "../components/ui/button"






const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800">Login</h1>
        <p className="text-center text-gray-600">You need to log in to continue.</p>
        <Button asChild className="w-full">
        <a href="http://localhost:3000/api/login">Login</a>
        </Button>
      </div>
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