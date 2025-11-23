'use server'

import { updateTag } from 'next/cache'

import { RegistrarUsuarioData } from '@/lib/schemas/usuario'
import { Usuario } from '@/types/models'
import { env } from '@/util/env'
import { IResult, Result } from '@/util/result'

export async function buscarUsuariosAction(): Promise<IResult<Usuario[]>> {
  try {
    const response = await fetch(`${env('API_URL')}/usuarios`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        tags: ['usuarios']
      }
    }).then(r => r.json())

    return Result.ok(response)
  } catch (error: any) {
    return Result.error(error.message)
  }
}

export async function buscarUsuarioAction(id: number): Promise<IResult<Usuario[]>> {
  try {
    const response = await fetch(`${env('API_URL')}/usuarios/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(r => r.json())

    return Result.ok(response)
  } catch (error: any) {
    return Result.error(error.message)
  }
}

export async function registrarUsuarioAction(data: RegistrarUsuarioData): Promise<IResult<boolean>> {
  try {
    await fetch(`${env('API_URL')}/usuarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then(r => r.json())

    updateTag('usuarios')

    return Result.ok(true)
  } catch (error: any) {
    return Result.error(error.message)
  }
}

export async function updateUsuarioAction(id: number, data: RegistrarUsuarioData): Promise<IResult<boolean>> {
  try {
    await fetch(`${env('API_URL')}/usuarios/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then(r => r.json())

    updateTag('usuarios')

    return Result.ok(true)
  } catch (error: any) {
    return Result.error(error.message)
  }
}

export async function inativarUsuarioAction(id: number): Promise<IResult<boolean>> {
  try {
    await fetch(`${env('API_URL')}/usuarios/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(r => r.json())

    updateTag('usuarios')

    return Result.ok(true)
  } catch (error: any) {
    return Result.error(error.message)
  }
}
