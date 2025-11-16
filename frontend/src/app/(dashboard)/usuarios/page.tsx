'use client'

import { Button } from '@/components/ui/button'
import { UsuarioService } from '@/services/UsuarioService'
import { Usuario } from '@/types/models'
import { Edit, Save, Trash, Users, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput
} from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { Toolbar } from '@/components/ui/toolbar'

const usuarioService = new UsuarioService()

export default function UsuariosPage() {
  const [list, setList] = useState<Usuario[]>([])
  const [editing, setEditing] = useState<Usuario | null>(null)
  const [form, setForm] = useState({ nome: '', email: '', telefone: '', senha: '' })

  useEffect(() => {
    usuarioService.list().then(usuarios => setList(usuarios))
  }, [])

  const refresh = () => usuarioService.list().then(usuarios => setList(usuarios))

  const onCreate = (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.nome || !form.email) {
      return alert('Nome e e-mail são obrigatórios')
    }

    usuarioService.create({ nome: form.nome, email: form.email, telefone: form.telefone, senha: form.senha })

    setForm({ nome: '', email: '', telefone: '', senha: '' })
    refresh()
  }

  const onEdit = (usuario: Usuario) => {
    setEditing(usuario)
    setForm({ nome: usuario.nome, email: usuario.email, telefone: usuario.telefone || '', senha: usuario.senha || '' })
  }

  const onUpdate = (e: React.FormEvent) => {
    e.preventDefault()

    if (!editing) {
      return
    }

    usuarioService.update(editing.id, { nome: form.nome, email: form.email, telefone: form.telefone })

    setEditing(null)
    setForm({ nome: '', email: '', telefone: '', senha: '' })
    refresh()
  }

  const onDelete = (id: number) => {
    if (!confirm('Remover usuário?')) {
      return
    }

    usuarioService.remove(id).then(() => refresh())
  }

  const clearForm = () => {
    setEditing(null)
    setForm({ nome: '', email: '', telefone: '', senha: '' })
  }

  return (
    <div>
      <div className='flex gap-2'>
        <Users />
        <h1 className="text-xl font-bold mb-4">Usuários</h1>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <form onSubmit={editing ? onUpdate : onCreate} className="bg-white p-4 rounded shadow space-y-3">
          <h2 className="font-semibold">{editing ? 'Editar Usuário' : 'Novo Usuário'}</h2>

          <InputGroup>
            <InputGroupInput id="nome" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
            <InputGroupAddon align="block-start">
              <Label htmlFor="nome">Nome <span className='text-red-600'>*</span></Label>
            </InputGroupAddon>
          </InputGroup>

          <InputGroup>
            <InputGroupInput id="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <InputGroupAddon align="block-start">
              <Label htmlFor="email">Email <span className='text-red-600'>*</span></Label>
            </InputGroupAddon>
          </InputGroup>

          {!editing
            && <InputGroup>
              <InputGroupInput id="senha" value={form.senha} onChange={(e) => setForm({ ...form, senha: e.target.value })} />
              <InputGroupAddon align="block-start">
                <Label htmlFor="senha">Senha</Label>
              </InputGroupAddon>
            </InputGroup>}

          <InputGroup>
            <InputGroupInput id="telefone" value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })} />
            <InputGroupAddon align="block-start">
              <Label htmlFor="telefone">Telefone</Label>
            </InputGroupAddon>
          </InputGroup>

          <Toolbar>
            {!editing
              ? <Button type="submit" className='flex gap-2 items-center'><Save size={22} /> Criar</Button>
              : (
                <>
                  <Button type="submit" className='flex gap-2 items-center'><Save size={22} /> Atualizar</Button>
                  <Button type="button" onClick={clearForm} className='flex gap-2 items-center bg-red-700'><X size={22} /> Cancelar</Button>
                </>
              )
            }
          </Toolbar>
        </form>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Lista</h2>

          <div className="space-y-2">
            {list.map(usuario => (
              <div key={usuario.id}>
                <div className="flex items-center justify-between p-2">
                  <div>
                    <div className="font-medium">{usuario.nome}</div>
                    <div className="text-xs text-gray-500">{usuario.email} • {usuario.telefone}</div>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => onEdit(usuario)} className="text-blue-600 text-sm"><Edit /></button>
                    <button onClick={() => onDelete(usuario.id)} className="text-red-600 text-sm"><Trash /></button>
                  </div>
                </div>

                <hr className="my-2 border-t border-gray-300 w-full mx-auto" />
              </div>
            ))}

            {list.length === 0 && <div className="text-sm text-gray-500">Nenhum usuário cadastrado.</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
