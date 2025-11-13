import { useMockApi } from '@/hooks/useMockApi'
import { NotificationTransaction } from '@/types/models'

export const NotificationService = () => {
  const api = useMockApi<NotificationTransaction>('notifications')

  const list = () => api.list()

  const create = (payload: Omit<NotificationTransaction, 'id' | 'sentAt'>) => api.create({ ...payload, sentAt: new Date().toISOString() } as any)

  const remove = (id: number) => api.remove(id)

  return { list, create, remove }
}
