'use server'

import { updateTag } from 'next/cache'

import { LoginUsuarioData, RegistrarUsuarioData } from '@/lib/schemas/usuario'
import { createRequest } from '@/util/api'
import { env } from '@/util/env'
import { Result } from '@/util/result'

const request = await createRequest(env('API_URL'))

export async function loginAction(data: LoginUsuarioData) {
  const response = await request.post<{ token: string }>('/auth/login', { body: data })

  return response
}

export async function signUpAction(data: RegistrarUsuarioData) {
  const response = await request.post('/auth/register', { body: data })

  if (!response.ok) {
    return Result.fromResult<boolean>(response)
  }

  updateTag('usuarios')

  return Result.ok(true)
}
