import { TransactionService } from '@/services/transactionService'
import { TransactionStatus } from '@/types/models'

export const ReportService = () => {
  const transactionService = TransactionService()

  const saldoGeral = () => {
    const transactions = transactionService.list()

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

  const concluded = () => transactionService.list().filter(transaction => transaction.status === 'QUITADA')

  const overdue = () => transactionService.list().filter(transaction => transaction.status === 'ATRASADA')

  return { saldoGeral, concluded, overdue }
}
