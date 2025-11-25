'use server'

import { cookies } from 'next/headers'

import { createApi } from '@/util/api'
import { env } from '@/util/env'

export async function getApi() {
  const cookieStore = await cookies()

  const token = cookieStore.get('auth_token')?.value

  return await createApi(env('API_URL'), {
    onRequest: (_, options = {}) => {
      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`
        }
      }

      return options
    }
  })
}
