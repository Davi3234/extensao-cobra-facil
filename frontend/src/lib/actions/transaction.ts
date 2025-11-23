'use server'

import { updateTag } from 'next/cache'

import { RegistrarTransacaoData } from '@/lib/schemas/transacao'
import { Transacao } from '@/types/models'
import { createRequest } from '@/util/api'
import { env } from '@/util/env'
import { IResult, Result } from '@/util/result'

const request = await createRequest(env('API_URL'))

export async function buscarTransacoesAction(): Promise<IResult<Transacao[]>> {
  const response = await request.get<Transacao[]>('/transacoes', {
    next: {
      tags: ['transacoes']
    }
  })

  return response
}

export async function buscarTransacaoAction(id: number) {
  const response = await request.get<Transacao>(`/transacoes/${id}`)

  return response
}

export async function cadastrarTransacaoAction(data: RegistrarTransacaoData) {
  const response = await request.post('/transacoes', { body: data })

  if (!response.ok) {
    return Result.fromResult<boolean>(response)
  }

  updateTag('transacoes')
  updateTag('relatorio')

  return Result.ok(true)
}

export async function quitarTransacaoAction(id: number) {
  const response = await request.put(`/transacoes/quitar/${id}`)

  if (!response.ok) {
    return Result.fromResult<boolean>(response)
  }

  updateTag('transacoes')
  updateTag('relatorio')

  return Result.ok(true)
}

export async function excluirTransacaoAction(id: number) {
  const response = await request.put(`/transacoes/${id}`)

  if (!response.ok) {
    return Result.fromResult<boolean>(response)
  }

  updateTag('transacoes')
  updateTag('relatorio')

  return Result.ok(true)
}
