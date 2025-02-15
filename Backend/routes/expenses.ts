import {Hono} from 'hono'
import { zValidator } from '@hono/zod-validator'
import {z} from 'zod'



// Define the schema for the expense object using Zod
const expenseSchema = z.object({
    id : z.number().int().positive().min(1),
    title: z.string().min(3).max(100),
    amount: z.number().int().positive()
})


// Define the schema for the POST request body using Zod
const createPostSchema = expenseSchema.omit({id: true})


// Define the Expense type using the Zod schema
type Expense = z.infer<typeof expenseSchema>

// Fake expenses data for testing
const fakeExpenses: Expense[] = [
    { id: 1, title: 'Food', amount: 100 },
    { id: 2, title: 'Rent', amount: 1000 },
    { id: 3, title: 'Insurance', amount: 200 },
]


// Define the expenses route
export const expensesRoute = new Hono()


// Define the route handlers for the expenses route 
.get('/', (c) => {
    c.status(200)
    return c.json({ expenses: fakeExpenses })
})


// Validate the POST request body using the Zod schema
.post('/', zValidator("json" , createPostSchema) , async (c) => {
    const data = await c.req.valid("json")
    const expense = createPostSchema.parse(data)
    fakeExpenses.push({...expense , id: fakeExpenses.length + 1})
    c.status(201)
    return c.json(expense)
})


.get('/total-spent', (c)=>{

    const total = fakeExpenses.reduce((acc, expense) => acc + expense.amount, 0)
    return c.json({total })
})


.get('/:id{[0-9]+}', async (c) => {
    const id = Number.parseInt(c.req.param('id'))
    const expense = fakeExpenses.find(expense => expense.id === id)
    if (!expense) {
        return c.notFound()
    }
    return c.json(expense)

  })



.delete('/:id{[0-9]+}', async (c) => {
    const id = Number.parseInt(c.req.param('id'))
    const expense = fakeExpenses.find(expense => expense.id === id)
    if (!expense) {
        return c.notFound()
    }
    fakeExpenses.splice(fakeExpenses.indexOf(expense), 1)
    return c.json(expense)

  })
