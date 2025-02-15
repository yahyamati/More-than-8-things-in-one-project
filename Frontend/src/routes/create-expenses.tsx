import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/expenses' as never)({
  component: CreateExpenses,
})

function CreateExpenses() {
 
  return <div>Create Expenses</div>
}