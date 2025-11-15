'use client'

import { MockApi } from '@/lib/MockApi'
import { NotificationTransacao } from '@/types/models'

export class NotificationService {
  private api = new MockApi<NotificationTransacao>('notifications')

  async list() {
    return this.api.list()
  }

  async create(payload: Omit<NotificationTransacao, 'id' | 'dataEnvio'>) {
    return this.api.create({ ...payload, dataEnvio: new Date().toISOString() } as any)
  }

  async remove(id: number) {
    return this.api.remove(id)
  }
}
