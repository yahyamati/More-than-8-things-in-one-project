import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
// import { serveStatic } from 'hono/bun'
import { expensesRoute } from './routes/expenses'
import { authRoute } from './routes/auth'



// Create a new Hono app
const app = new Hono()
// Log all requests
app.use('*',logger())
app.use('/api/*', cors())

app.use(cors({
    origin:["http://localhost:3000", "http://localhost:5173"], 
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests'],
    credentials: true,
  }));

// Define the expenses route 
const apiRoutes = app.basePath("/api").route('/expenses', expensesRoute).route('/' , authRoute)

// app.use('*', serveStatic({ root: './dist' }))
// app.get('*', serveStatic({ path: './dist/index.html' }))

export default app // for Cloudflare Workers or Bun
export type ApiRoutes = typeof apiRoutes