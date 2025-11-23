'use server'

import { Transacao } from '@/types/models'
import { env } from '@/util/env'
import { IResult, Result } from '@/util/result'

export async function calcularSaldoAction(): Promise<IResult<{
  totalReceber: number
  totalPagar: number
  saldoGeral: number
}>> {
  try {
    const response = await fetch(`${env('API_URL')}/relatorios/saldo`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        tags: ['relatorio']
      }
    }).then(r => r.json())

    return Result.ok(response)
  } catch (error: any) {
    return Result.error(error.message)
  }
}

export async function contarTransacaoStatus(): Promise<IResult<{
  quitadasCount: number
  atrasadasCount: number
}>> {
  const responseTransacaoQuitada = await buscarTransacoesQuitadasAction()

  if (!responseTransacaoQuitada.ok) {
    return responseTransacaoQuitada as IResult<any>
  }

  const responseTransacaoAtrasada = await buscarTransacoesAtrasadasAction()

  if (!responseTransacaoAtrasada.ok) {
    return responseTransacaoAtrasada as IResult<any>
  }

  return Result.ok({
    quitadasCount: responseTransacaoQuitada.value?.length || 0,
    atrasadasCount: responseTransacaoAtrasada.value?.length || 0,
  })
}


export async function buscarTransacoesQuitadasAction(): Promise<IResult<Transacao[]>> {
  try {
    const response = await fetch(`${env('API_URL')}/relatorios/quitadas`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        tags: ['relatorio']
      }
    }).then(r => r.json())

    return Result.ok(response)
  } catch (error: any) {
    return Result.error(error.message)
  }
}

export async function buscarTransacoesAtrasadasAction(): Promise<IResult<Transacao[]>> {
  try {
    const response = await fetch(`${env('API_URL')}/relatorios/atrasadas`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        tags: ['relatorio']
      }
    }).then(r => r.json())

    return Result.ok(response)
  } catch (error: any) {
    return Result.error(error.message)
  }
}
