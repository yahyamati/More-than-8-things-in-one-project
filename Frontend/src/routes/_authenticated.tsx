import { createFileRoute, Outlet } from "@tanstack/react-router"
import { GetLogin, userQueryOption } from "../lib/api"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Button } from "../components/ui/button"
import { useState } from "react"





const Login = () => {
  const queryClient = useQueryClient()
  const handleLogin = async () => {
    try {
      const data = await queryClient.fetchQuery(GetLogin) 
      window.location.href = data.url 
    } catch (error) {
      console.error("Error fetching login URL:", error)
    }
  }

  return (
    <div>
      <p>You need to log in to continue.</p>
      <Button onClick={handleLogin}>Login</Button>
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