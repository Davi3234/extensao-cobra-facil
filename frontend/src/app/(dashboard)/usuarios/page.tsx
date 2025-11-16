'use client'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { UsuarioService } from '@/services/UsuarioService'
import { Usuario } from '@/types/models'
import { useEffect, useState } from 'react'

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

  const onEdit = (u: Usuario) => {
    setEditing(u)
    setForm({ nome: u.nome, email: u.email, telefone: u.telefone || '', senha: u.senha || '' })
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

    usuarioService.remove(id)

    refresh()
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Usuários</h1>

      <div className="grid grid-cols-2 gap-4">
        <form onSubmit={editing ? onUpdate : onCreate} className="bg-white p-4 rounded shadow space-y-3">
          <h2 className="font-semibold">{editing ? 'Editar Usuário' : 'Novo Usuário'}</h2>

          <Input label="Nome" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
          <Input label="E-mail" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Input label="Telefone" value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })} />

          {!editing && <Input label="Senha" type="senha" value={form.senha} onChange={(e) => setForm({ ...form, senha: e.target.value })} />}

          <Button type="submit">{editing ? 'Atualizar' : 'Criar'}</Button>

          {editing && <Button type="button" onClick={() => { setEditing(null); setForm({ nome: '', email: '', telefone: '', senha: '' }) }}>Cancelar</Button>}
        </form>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Lista</h2>

          <div className="space-y-2">
            {list.map(usuario => (
              <div key={usuario.id} className="flex items-center justify-between p-2 border rounded">
                <div>
                  <div className="font-medium">{usuario.nome}</div>
                  <div className="text-xs text-gray-500">{usuario.email} • {usuario.telefone}</div>
                </div>

                <div className="flex gap-2">
                  <button onClick={() => onEdit(usuario)} className="text-blue-600 text-sm">Editar</button>
                  <button onClick={() => onDelete(usuario.id)} className="text-red-600 text-sm">Remover</button>
                </div>
              </div>
            ))}

            {list.length === 0 && <div className="text-sm text-gray-500">Nenhum usuário cadastrado.</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
