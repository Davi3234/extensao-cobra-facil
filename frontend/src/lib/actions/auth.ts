'use server'

import { updateTag } from 'next/cache'
import { cookies } from 'next/headers'

import { LoginUsuarioData, RegistrarUsuarioData } from '@/lib/schemas/usuario'
import { createRequest } from '@/util/api'
import { env } from '@/util/env'
import { Result } from '@/util/result'

const request = await createRequest(env('API_URL'))

export async function loginAction(data: LoginUsuarioData) {
  const cookieStore = await cookies()

  const response = await request.post<{ token: string }>('/auth/login', { body: data })

  if (!response.ok) {
    return Result.fromResult<boolean>(response)
  }

  cookieStore.set('auth_token', response.value.token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24,
  })

  return Result.ok(true)
}

export async function signUpAction(data: RegistrarUsuarioData) {
  const response = await request.post('/auth/register', { body: data })

  if (!response.ok) {
    return Result.fromResult<boolean>(response)
  }

  updateTag('usuarios')

  return Result.ok(true)
}

export async function logoutAction() {
  const cookieStore = await cookies()

  cookieStore.set('auth_token', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  })

  return Result.ok(true)
}
