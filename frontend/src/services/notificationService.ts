'use client'

import { MockApi } from '@/lib/MockApi'
import { NotificationTransaction } from '@/types/models'

export class NotificationService {
  private api = new MockApi<NotificationTransaction>('notifications')

  list() {
    return this.api.list()
  }

  create(payload: Omit<NotificationTransaction, 'id' | 'sentAt'>) {
    return this.api.create({ ...payload, sentAt: new Date().toISOString() } as any)
  }

  remove(id: number) {
    return this.api.remove(id)
  }
}
