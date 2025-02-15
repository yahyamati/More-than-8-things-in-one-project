import { hc } from 'hono/client'
import {type ApiRoutes} from '../../../Backend/app.ts'

const client = hc<ApiRoutes>('https://app-exprenses-demo.onrender.com')


export const api = client.api