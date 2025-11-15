'use client'

import { MockApi } from '@/lib/MockApi'
import { Usuario } from '@/types/models'

const mockUsuarios: Usuario[] = [
  { id: 1, nome: 'Admin', email: 'admin@mail.com', senha: '1234', telefone: '999999999', ativo: 1 },
]

export class UsuarioService {
  private api = new MockApi<Usuario>('usuarios', mockUsuarios)

  async list() {
    return this.api.list()
  }

  async find(id: number) {
    return this.api.find(id)
  }

  async create(payload: Omit<Usuario, 'id' | 'ativo'>) {
    return this.api.create({ ...payload, ativo: 1 } as any)
  }

  async update(id: number, payload: Partial<Usuario>) {
    return this.api.update(id, payload)
  }

  async remove(id: number) {
    return this.api.remove(id)
  }
}
