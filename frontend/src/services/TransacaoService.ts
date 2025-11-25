'use client'

import { MockApi } from '@/lib/MockApi'
import { Transacao, TransacaoStatus } from '@/types/models'

export class TransacaoService {
  private api = new MockApi<Transacao>('transacoes')

  async list() {
    return this.api.list().map(transacao => {
      if (transacao.status !== TransacaoStatus.QUITADA) {
        const now = new Date()
        const due = new Date(transacao.dataVencimento)

        if (due < now) {
          transacao.status = TransacaoStatus.ATRASADA
        }
      }

      return transacao
    })
  }

  async find(id: number) {
    return this.api.find(id)
  }

  async create(payload: Omit<Transacao, 'id'>) {
    return this.api.create(payload as any)
  }

  async update(id: number, payload: Partial<Transacao>) {
    return this.api.update(id, payload)
  }

  async remove(id: number) {
    return this.api.remove(id)
  }
}
