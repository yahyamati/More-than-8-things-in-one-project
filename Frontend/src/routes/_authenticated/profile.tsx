import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card.tsx"
import { userQueryOption} from "../../lib/api.ts"
import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'



export const Route = createFileRoute('/_authenticated/profile')({
  component: Profile,
})



function Profile() {
  const { isPending, error, data } = useQuery(userQueryOption)

  if (error) return 'An error has occurred: ' + error.message


  return (
    <>   
    <Card className="w-[350px] m-auto">
    <CardHeader>
      <CardTitle>User name</CardTitle>
    </CardHeader>
    <CardContent>{isPending ? "Loading..." :data.user.family_name} </CardContent>
    <CardContent>{isPending ? "Loading..." :data.user.given_name} </CardContent>
    <a href="http://localhost:3000/api/logout">Logout</a>
  </Card>
   
  </>
  )
}


