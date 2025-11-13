'use client'

import { TransactionService } from '@/services/transactionService'
import { TransactionStatus } from '@/types/models'

export class ReportService {
  private transactionService = new TransactionService()

  saldoGeral() {
    const transactions = this.transactionService.list()

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

  concluded() {
    return this.transactionService.list().filter(transaction => transaction.status === 'QUITADA')
  }

  overdue() {
    return this.transactionService.list().filter(transaction => transaction.status === 'ATRASADA')
  }
}
