'use server'

import { getApi } from '@/lib/actions/api'
import { RegistrarTransacaoData } from '@/lib/schemas/transacao'
import { TransacaoWithUsuario } from '@/types/models'
import { Result } from '@/util/result'
import { revalidatePath } from 'next/cache'

function revalidateTransacoes() {
  revalidatePath('/(dashboard)/transacoes')
}

export async function buscarTransacoesAction() {
  const request = await getApi()

  const response = await request.get<TransacaoWithUsuario[]>('/transacoes')

  return response
}

export async function buscarTransacaoAction(id: number) {
  const request = await getApi()

  const response = await request.get<TransacaoWithUsuario>(`/transacoes/${id}`)

  return response
}

export async function cadastrarTransacaoAction(data: RegistrarTransacaoData) {
  const request = await getApi()

  const response = await request.post('/transacoes', { body: data })

  if (!response.ok) {
    return Result.fromResult<boolean>(response)
  }

  revalidateTransacoes()
  return Result.ok(true)
}

export async function quitarTransacaoAction(id: number) {
  const request = await getApi()

  const response = await request.put(`/transacoes/quitar/${id}`)

  if (!response.ok) {
    return Result.fromResult<boolean>(response)
  }

  revalidateTransacoes()
  return Result.ok(true)
}

export async function excluirTransacaoAction(id: number) {
  const request = await getApi()

  const response = await request.delete(`/transacoes/${id}`)

  if (!response.ok) {
    return Result.fromResult<boolean>(response)
  }

  revalidateTransacoes()
  return Result.ok(true)
}
