'use client'

import { MockApi } from '@/lib/MockApi'
import { User } from '@/types/models'

const mockUsers: User[] = [
  { id: 1, name: 'Admin', email: 'admin@mail.com', password: '1234', phone: '999999999' },
]

export class UserService {
  private api = new MockApi<User>('users', mockUsers)

  list() {
    return this.api.list()
  }

  find(id: number) {
    return this.api.find(id)
  }

  create(payload: Omit<User, 'id'>) {
    return this.api.create(payload as any)
  }

  update(id: number, payload: Partial<User>) {
    return this.api.update(id, payload)
  }

  remove(id: number) {
    return this.api.remove(id)
  }
}
