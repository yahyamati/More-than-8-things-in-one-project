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

app.use('/static/*', serveStatic({ root: './frontend/dist' }))
app.get('*', serveStatic({ path: './frontend/dist/index.html' }))

export default app // for Cloudflare Workers or Bun