import { createFileRoute } from "@tanstack/react-router"
import { Skeleton } from "../../components/ui/skeleton.tsx"
import { useQuery } from "@tanstack/react-query"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table.tsx"
import { getAllExpensesQueryOptions } from "../../lib/api.ts"



export const Route = createFileRoute("/expenses" as never)({
  component: Expenses,
})



function Expenses() {
  const { isPending, error, data } = useQuery(getAllExpensesQueryOptions)

  if (error) return <div>An error has occurred: {error.message}</div>

  return (
    <div className="mx-auto py-10 max-w-3xl">
      <Table>
        <TableCaption>A list of all expenses</TableCaption>
        <TableHeader>
          <TableRow>
           <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {isPending ? 
        Array.from({ length: 3 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-4 " />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4" />
            </TableCell>
          </TableRow>
        ))
        : data?.expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell className="font-medium">{expense.id}</TableCell>
              <TableCell>{expense.title}</TableCell>
              <TableCell>${expense.amount.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell>${data?.expenses.reduce((total: number, expense: any) => total + expense.amount, 0).toFixed(2)}</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    </div>
  )
}

