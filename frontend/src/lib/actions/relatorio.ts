'use server'

import { api } from '@/lib/actions/api'
import { Transacao } from '@/types/models'
import { Result } from '@/util/result'

export async function calcularSaldoAction() {
  const response = await api.get<{
    totalReceber: number
    totalPagar: number
    saldoGeral: number
  }>('/relatorios/saldo', {
    next: {
      tags: ['relatorio']
    }
  })

  return response
}

export async function contarTransacaoStatus() {
  const responseTransacaoQuitada = await buscarTransacoesQuitadasAction()

  if (!responseTransacaoQuitada.ok) {
    return Result.fromResult<{ quitadasCount: number; atrasadasCount: number }>(responseTransacaoQuitada)
  }

  const responseTransacaoAtrasada = await buscarTransacoesAtrasadasAction()

  if (!responseTransacaoAtrasada.ok) {
    return Result.fromResult<{ quitadasCount: number; atrasadasCount: number }>(responseTransacaoAtrasada)
  }

  return Result.ok({
    quitadasCount: responseTransacaoQuitada.value?.length || 0,
    atrasadasCount: responseTransacaoAtrasada.value?.length || 0,
  })
}

export async function buscarTransacoesQuitadasAction() {
  const response = await api.get<Transacao[]>('/relatorios/quitadas', {
    next: {
      tags: ['relatorio']
    }
  })

  return response
}

export async function buscarTransacoesAtrasadasAction() {
  const response = await api.get<Transacao[]>('/relatorios/atrasadas', {
    next: {
      tags: ['relatorio']
    }
  })

  return response
}
