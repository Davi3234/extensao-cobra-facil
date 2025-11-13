'use client'

import { MockApi } from '@/lib/MockApi'
import { Transaction, TransactionStatus } from '@/types/models'

export class TransactionService {
  private api = new MockApi<Transaction>('transactions')

  list() {
    return this.api.list().map(transaction => {
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

  find(id: number) {
    return this.api.find(id)
  }

  create(payload: Omit<Transaction, 'id'>) {
    return this.api.create(payload as any)
  }

  update(id: number, payload: Partial<Transaction>) {
    return this.api.update(id, payload)
  }

  remove(id: number) {
    return this.api.remove(id)
  }
}
