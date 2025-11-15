'use client'

import { TransactionService } from '@/services/transactionService'
import { TransactionStatus } from '@/types/models'

export class ReportService {
  private transactionService = new TransactionService()

  async getStatistics() {
    const [saldo, quitadasCount, atrasadasCount] = await Promise.all([
      this.saldoGeral(),
      this.concluded(),
      this.overdue(),
    ])

    return { saldo, quitadasCount: quitadasCount.length, atrasadasCount: atrasadasCount.length }
  }

  async saldoGeral() {
    const transactions = await this.transactionService.list()

    let totalReceber = 0
    let totalPagar = 0

    transactions.forEach(transaction => {
      if (transaction.status === TransactionStatus.PENDENTE || transaction.status === TransactionStatus.ATRASADA) {
        totalReceber += transaction.creditorId ? transaction.value : 0
        totalPagar += transaction.debtorId ? transaction.value : 0
      }
    })

    return { totalReceber, totalPagar, transactionsCount: transactions.length }
  }

  async concluded() {
    return (await this.transactionService.list()).filter(transaction => transaction.status === 'QUITADA')
  }

  async overdue() {
    return (await this.transactionService.list()).filter(transaction => transaction.status === 'ATRASADA')
  }
}
