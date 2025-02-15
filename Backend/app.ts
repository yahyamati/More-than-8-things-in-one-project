import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { serveStatic } from 'hono/bun'
import { expensesRoute } from './routes/expenses'

// Create a new Hono app
const app = new Hono()
// Log all requests
app.use('*',logger())

// Define the expenses route
app.route('/api/expenses', expensesRoute)

app.use('*', serveStatic({ root: '../Frontend/dist' }))
app.get('*', serveStatic({ path: '../Frontend/dist/index.html' }))

export default app // for Cloudflare Workers or Bun