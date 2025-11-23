'use server'

import { updateTag } from 'next/cache'

import { LoginUsuarioData, RegistrarUsuarioData } from '@/lib/schemas/usuario'
import { env } from '@/util/env'
import { IResult, Result } from '@/util/result'

export async function loginAction(data: LoginUsuarioData): Promise<IResult<{ token: string }>> {
  try {
    const response = await fetch(`${env('API_URL')}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then(r => r.json())

    return Result.ok({ token: response.token })
  } catch (error: any) {
    return Result.error(error.message)
  }
}

export async function signUpAction(data: RegistrarUsuarioData): Promise<IResult<boolean>> {
  try {
    await fetch(`${env('API_URL')}/auth/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    updateTag('usuarios')

    return Result.ok(true)
  } catch (error: any) {
    return Result.error(error.message)
  }
}
