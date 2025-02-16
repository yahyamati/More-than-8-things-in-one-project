import { hc } from 'hono/client'
import {type ApiRoutes} from '../../../Backend/app.ts'
import { queryOptions } from '@tanstack/react-query'

const client = hc<ApiRoutes>('https://app-exprenses-demo.onrender.com')


export const api = client.api


export async function getAllExpenses() {
    const res = await api.expenses.$get()
    if (!res.ok) {
      throw new Error("Server Error")
    }
    const data = await res.json()
    return data
  }

  export const getAllExpensesQueryOptions = queryOptions({
    queryKey: ["get-all-expenses"],
    queryFn: getAllExpenses,
    staleTime: 1000 * 60 * 5,
  });


  
  