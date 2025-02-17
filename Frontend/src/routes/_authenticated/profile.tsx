import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card.tsx"
import {GetLogout, userQueryOption} from "../../lib/api.ts"
import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { Button } from '../../components/ui/button.tsx'



export const Route = createFileRoute('/_authenticated/profile')({
  component: Profile,
})






function Profile() {
  const queryClient = useQueryClient()
  const { isPending, error, data } = useQuery(userQueryOption)

  if (error) return 'An error has occurred: ' + error.message

  const handleLogout = async () => { 
  
    try {
      const data = await queryClient.fetchQuery(GetLogout) 
      if (data?.url) {
        window.location.href = data.url // ✅ Redirection après déconnexion
        console.log("Déconnexion réussie", data.url)
      } else {
        console.error("URL de déconnexion introuvable")
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
    }
  }
 

  return (
    <>   
    <Card className="w-[350px] m-auto">
    <CardHeader>
      <CardTitle>User name</CardTitle>
    </CardHeader>
    <CardContent>{isPending ? "Loading..." :data.user.family_name} </CardContent>
    <CardContent>{isPending ? "Loading..." :data.user.given_name} </CardContent>
    <Button onClick={handleLogout}>Se Déconnecter</Button>
  </Card>
   
  </>
  )
}


