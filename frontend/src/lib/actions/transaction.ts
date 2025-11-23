'use server'

import { updateTag } from 'next/cache'

import { RegistrarTransacaoData } from '@/lib/schemas/transacao'
import { Transacao } from '@/types/models'
import { env } from '@/util/env'
import { IResult, Result } from '@/util/result'

export async function buscarTransacoesAction(): Promise<IResult<Transacao[]>> {
  try {
    const response = await fetch(`${env('API_URL')}/transacoes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        tags: ['transacoes']
      }
    }).then(r => r.json())

    return Result.ok(response)
  } catch (error: any) {
    return Result.error(error.message)
  }
}

export async function buscarTransacaoAction(id: number): Promise<IResult<Transacao>> {
  try {
    const response = await fetch(`${env('API_URL')}/transacoes/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(r => r.json())

    return Result.ok(response)
  } catch (error: any) {
    return Result.error(error.message)
  }
}

export async function cadastrarTransacaoAction(data: RegistrarTransacaoData): Promise<IResult<boolean>> {
  try {
    await fetch(`${env('API_URL')}/transacoes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then(r => r.json())

    updateTag('transacoes')
    updateTag('relatorio')

    return Result.ok(true)
  } catch (error: any) {
    return Result.error(error.message)
  }
}

export async function quitarTransacaoAction(id: number): Promise<IResult<boolean>> {
  try {
    await fetch(`${env('API_URL')}/transacoes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(r => r.json())

    updateTag('transacoes')
    updateTag('relatorio')

    return Result.ok(true)
  } catch (error: any) {
    return Result.error(error.message)
  }
}

export async function excluirTransacaoAction(id: number): Promise<IResult<boolean>> {
  try {
    await fetch(`${env('API_URL')}/transacoes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(r => r.json())

    updateTag('transacoes')
    updateTag('relatorio')

    return Result.ok(true)
  } catch (error: any) {
    return Result.error(error.message)
  }
}
