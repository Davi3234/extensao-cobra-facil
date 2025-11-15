'use client'

import { MockApi } from '@/lib/MockApi'
import { User } from '@/types/models'

const mockUsers: User[] = [
  { id: 1, name: 'Admin', email: 'admin@mail.com', password: '1234', phone: '999999999' },
]

export class UserService {
  private api = new MockApi<User>('users', mockUsers)

  async list() {
    return this.api.list()
  }

  async find(id: number) {
    return this.api.find(id)
  }

  async create(payload: Omit<User, 'id'>) {
    return this.api.create(payload as any)
  }

  async update(id: number, payload: Partial<User>) {
    return this.api.update(id, payload)
  }

  async remove(id: number) {
    return this.api.remove(id)
  }
}
