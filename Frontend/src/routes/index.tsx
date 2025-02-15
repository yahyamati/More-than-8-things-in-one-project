import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import {api} from "../lib/api.ts"
import {
  useQuery,
} from '@tanstack/react-query'



export const Route = createFileRoute('/' as never)({
  component: Index,
})

//fonction qui permet de recuperer le total des depenses
async function getTotalSpent(){
  const res = await api.expenses["total-spent"].$get()

  if(!res.ok){
    throw new Error('Server Error')
  }
    const data = await res.json()
    return data
}



function Index() {
  const { isPending, error, data } = useQuery({ queryKey: ['get-total-spent'], queryFn: getTotalSpent })

  if (error) return 'An error has occurred: ' + error.message

  return (
    <>   
    <Card className="w-[350px] m-auto">
    <CardHeader>
      <CardTitle>Total Spent</CardTitle>
      <CardDescription>The total amount you'v spent .</CardDescription>
    </CardHeader>
    <CardContent>{isPending ? "Loading..." :data.total} </CardContent>
  </Card>
   
  </>
  )
}


