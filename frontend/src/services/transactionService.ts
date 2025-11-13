import { useMockApi } from '@/hooks/useMockApi'
import { Transaction, TransactionStatus } from '@/types/models'

export const TransactionService = () => {
  const api = useMockApi<Transaction>('transactions')

  const list = (): Transaction[] => {
    return api.list().map(transaction => {
      if (transaction.status !== TransactionStatus.QUITADA) {
        const now = new Date()
        const due = new Date(transaction.dueDate)

        if (due < now) {
          transaction.status = TransactionStatus.ATRASADA
        }
      }

      return transaction
    })
  }

  const find = (id: number) => api.find(id)

  const create = (payload: Omit<Transaction, 'id'>) => api.create(payload as any)

  const update = (id: number, payload: Partial<Transaction>) => api.update(id, payload)

  const remove = (id: number) => api.remove(id)

  return { list, find, create, update, remove }
}
