'use client'

import { TransacaoService } from '@/services/TransacaoService'
import { TransacaoStatus } from '@/types/models'

export class RelatorioService {
  private transacaoService = new TransacaoService()

  async getEstatisticas() {
    const [saldo, quitadasCount, atrasadasCount] = await Promise.all([
      this.saldoGeral(),
      this.getTotalConcluidas(),
      this.getTotalAtrasadas(),
    ])

    return { saldo, quitadasCount: quitadasCount.length, atrasadasCount: atrasadasCount.length }
  }

  async saldoGeral() {
    const transacoes = await this.transacaoService.list()

    let totalReceber = 0
    let totalPagar = 0

    transacoes.forEach(transacao => {
      if (transacao.status === TransacaoStatus.PENDENTE || transacao.status === TransacaoStatus.ATRASADA) {
        totalReceber += transacao.creditorId ? transacao.valor : 0
        totalPagar += transacao.debtorId ? transacao.valor : 0
      }
    })

    return { totalReceber, totalPagar, transacoesCount: transacoes.length }
  }

  async getTotalConcluidas() {
    return (await this.transacaoService.list()).filter(transacao => transacao.status === TransacaoStatus.QUITADA)
  }

  async getTotalAtrasadas() {
    return (await this.transacaoService.list()).filter(transacao => transacao.status === TransacaoStatus.ATRASADA)
  }
}
