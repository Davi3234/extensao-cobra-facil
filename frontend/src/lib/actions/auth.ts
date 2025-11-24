'use server'

import { cookies } from 'next/headers'

import { getApi } from '@/lib/actions/api'
import { LoginUsuarioData, RegistrarUsuarioData } from '@/lib/schemas/usuario'
import { Usuario } from '@/types/models'
import { Result } from '@/util/result'

export async function getCurrentUsuario() {
  const request = await getApi()

  const response = await request.get<Usuario>('/auth/me')

  if (!response.ok) {
    return Result.fromResult<Usuario | null>(response)
  }

  return response
}

export async function loginAction(data: LoginUsuarioData) {
  const request = await getApi()

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
  const request = await getApi()

  const response = await request.post('/auth/register', { body: data })

  if (!response.ok) {
    return Result.fromResult<boolean>(response)
  }

  return Result.ok(true)
}

export async function logoutAction() {
  const cookieStore = await cookies()

  cookieStore.delete('auth_token')

  return Result.ok(true)
}
