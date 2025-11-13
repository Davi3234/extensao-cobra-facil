import { useMockApi } from '@/hooks/useMockApi'
import { User } from '@/types/models'

const mockUsers: User[] = [
  { id: 1, name: 'Admin', email: 'admin@mail.com', password: '1234', phone: '999999999' },
]

export const UserService = () => {
  const api = useMockApi<User>('users', mockUsers)

  const list = (): User[] => api.list()

  const find = (id: number) => api.find(id)

  const create = (payload: Omit<User, 'id'>) => api.create(payload as any)

  const update = (id: number, payload: Partial<User>) => api.update(id, payload)

  const remove = (id: number) => api.remove(id)

  return { list, find, create, update, remove }
}
