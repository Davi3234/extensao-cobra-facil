'use server'

import { getApi } from '@/lib/actions/api'
import { RegistrarUsuarioData } from '@/lib/schemas/usuario'
import { Usuario } from '@/types/models'
import { Result } from '@/util/result'

export async function buscarUsuariosAction() {
  const request = await getApi()

  const response = await request.get<Usuario[]>('/usuarios')

  return response
}

export async function buscarUsuarioAction(id: number) {
  const request = await getApi()

  const response = await request.get<Usuario>(`/usuarios/${id}`)

  return response
}

export async function registrarUsuarioAction(data: RegistrarUsuarioData) {
  const request = await getApi()

  const response = await request.post('/usuarios', { body: data })

  if (!response.ok) {
    return Result.fromResult<boolean>(response)
  }

  return Result.ok(true)
}

export async function updateUsuarioAction(id: number, data: RegistrarUsuarioData) {
  const request = await getApi()

  const response = await request.put(`/usuarios/${id}`, { body: data })

  if (!response.ok) {
    return Result.fromResult<boolean>(response)
  }

  return Result.ok(true)
}

export async function inativarUsuarioAction(id: number) {
  const request = await getApi()

  const response = await request.delete(`/usuarios/${id}`)

  if (!response.ok) {
    return Result.fromResult<boolean>(response)
  }

  return Result.ok(true)
}
