'use server'

import { getApi } from '@/lib/actions/api'
import { RegistrarTransacaoData } from '@/lib/schemas/transacao'
import { Transacao } from '@/types/models'
import { IResult, Result } from '@/util/result'

export async function buscarTransacoesAction(): Promise<IResult<Transacao[]>> {
  const request = await getApi()

  const response = await request.get<Transacao[]>('/transacoes')

  return response
}

export async function buscarTransacaoAction(id: number) {
  const request = await getApi()

  const response = await request.get<Transacao>(`/transacoes/${id}`)

  return response
}

export async function cadastrarTransacaoAction(data: RegistrarTransacaoData) {
  const request = await getApi()

  const response = await request.post('/transacoes', { body: data })

  if (!response.ok) {
    return Result.fromResult<boolean>(response)
  }

  return Result.ok(true)
}

export async function quitarTransacaoAction(id: number) {
  const request = await getApi()

  const response = await request.put(`/transacoes/quitar/${id}`)

  if (!response.ok) {
    return Result.fromResult<boolean>(response)
  }

  return Result.ok(true)
}

export async function excluirTransacaoAction(id: number) {
  const request = await getApi()

  const response = await request.put(`/transacoes/${id}`)

  if (!response.ok) {
    return Result.fromResult<boolean>(response)
  }

  return Result.ok(true)
}
