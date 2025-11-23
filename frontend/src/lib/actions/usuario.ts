'use server'

import { updateTag } from 'next/cache'

import { RegistrarUsuarioData } from '@/lib/schemas/usuario'
import { Usuario } from '@/types/models'
import { createRequest } from '@/util/api'
import { env } from '@/util/env'
import { Result } from '@/util/result'

const request = await createRequest(env('API_URL'))

export async function buscarUsuariosAction() {
  const response = await request.get<Usuario[]>('/usuarios', {
    next: {
      tags: ['usuarios']
    }
  })

  return response
}

export async function buscarUsuarioAction(id: number) {
  const response = await request.get<Usuario>(`/usuarios/${id}`)

  return response
}

export async function registrarUsuarioAction(data: RegistrarUsuarioData) {
  const response = await request.post('/usuarios', { body: data })

  if (!response.ok) {
    return Result.fromResult<boolean>(response)
  }

  updateTag('usuarios')

  return Result.ok(true)
}

export async function updateUsuarioAction(id: number, data: RegistrarUsuarioData) {
  const response = await request.put(`/usuarios/${id}`, { body: data })

  if (!response.ok) {
    return Result.fromResult<boolean>(response)
  }

  updateTag('usuarios')

  return Result.ok(true)
}

export async function inativarUsuarioAction(id: number) {
  const response = await request.delete(`/usuarios/${id}`)

  if (!response.ok) {
    return Result.fromResult<boolean>(response)
  }

  updateTag('usuarios')

  return Result.ok(true)
}
