import { hc } from 'hono/client'
import {type ApiRoutes} from '../../../Backend/app.ts'
import { queryOptions } from '@tanstack/react-query'
import type { ExecutionContext } from 'hono'


const client = hc<ApiRoutes>('http://localhost:3000', {
  fetch: (input: URL | RequestInfo, init?: RequestInit, env?: any, executionCtx?: ExecutionContext) =>
    fetch(input, {
      ...init,
      credentials: "include",
    })
})

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
  


  // This function is used to get the current user
async function getCurrentUser(){
  const res = await api.me.$get()

  if(!res.ok){
    throw new Error('Server Error')
  }
    const data = await res.json()
    return data;
}

// This is the query option for the current user
  export const userQueryOption = queryOptions({ 
    queryKey: ["get-current-user"],
    queryFn: getCurrentUser,
    staleTime: Infinity,
   })
  
     