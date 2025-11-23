'use server'

import { updateTag } from 'next/cache'

import { api } from '@/lib/actions/api'
import { RegistrarTransacaoData } from '@/lib/schemas/transacao'
import { Transacao } from '@/types/models'
import { IResult, Result } from '@/util/result'

export async function buscarTransacoesAction(): Promise<IResult<Transacao[]>> {
  const response = await api.get<Transacao[]>('/transacoes', {
    next: {
      tags: ['transacoes']
    }
  })

  return response
}

export async function buscarTransacaoAction(id: number) {
  const response = await api.get<Transacao>(`/transacoes/${id}`)

  return response
}

export async function cadastrarTransacaoAction(data: RegistrarTransacaoData) {
  const response = await api.post('/transacoes', {
    body: data
  })

  if (!response.ok) {
    return Result.fromResult<boolean>(response)
  }

  updateTag('transacoes')
  updateTag('relatorio')

  return Result.ok(true)
}

export async function quitarTransacaoAction(id: number) {
  const response = await api.put(`/transacoes/quitar/${id}`)

  if (!response.ok) {
    return Result.fromResult<boolean>(response)
  }

  updateTag('transacoes')
  updateTag('relatorio')

  return Result.ok(true)
}

export async function excluirTransacaoAction(id: number) {
  const response = await api.put(`/transacoes/${id}`)

  if (!response.ok) {
    return Result.fromResult<boolean>(response)
  }

  updateTag('transacoes')
  updateTag('relatorio')

  return Result.ok(true)
}
