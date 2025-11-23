'use server'

import { updateTag } from 'next/cache'

import { api } from '@/lib/actions/api'
import { LoginUsuarioData, RegistrarUsuarioData } from '@/lib/schemas/usuario'
import { Result } from '@/util/result'

export async function loginAction(data: LoginUsuarioData) {
  const response = await api.post<{ token: string }>('/auth/login', {
    body: data
  })

  return response
}

export async function signUpAction(data: RegistrarUsuarioData) {
  const response = await api.post('/auth/sign-up', {
    body: data
  })

  if (!response.ok) {
    return Result.fromResult<boolean>(response)
  }

  updateTag('usuarios')

  return Result.ok(true)
}
