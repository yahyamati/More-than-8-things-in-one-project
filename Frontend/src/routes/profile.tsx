import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import {userQueryOption} from "../lib/api.ts"
import {
  useQuery,
} from '@tanstack/react-query'



export const Route = createFileRoute('/profile')({
  component: Profile,
})


function Profile() {
  const { isPending, error, data } = useQuery(userQueryOption)

  if (error) return 'An error has occurred: ' + error.message

  return (
    <>   
    <Card className="w-[350px] m-auto">
    <CardHeader>
      <CardTitle>Total Spent</CardTitle>
      <CardDescription>The total amount you'v spent .</CardDescription>
    </CardHeader>
    <CardContent>{isPending ? "Loading..." :data.user.family_name} </CardContent>
  </Card>
   
  </>
  )
}


