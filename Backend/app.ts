import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { expensesRoute } from './routes/expenses'

// Create a new Hono app
const app = new Hono()
// Log all requests
app.use('*',logger())

// Define a test route
app.get('/test', c => {
    return c.json({ message: 'test' })
})

// Define a 404 route
app.get('/notfound' , (c)=>{
    return c.notFound()
})

// Define the expenses route
app.route('/api/expenses', expensesRoute)

export default app // for Cloudflare Workers or Bun