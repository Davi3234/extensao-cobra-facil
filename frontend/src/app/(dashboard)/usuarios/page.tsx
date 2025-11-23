'use client'

import CadastroUsuario from '@/components/usuario/cadastro-usuario'
import { UsuarioService } from '@/services/UsuarioService'
import { Usuario } from '@/types/models'
import { Edit, Trash, Users } from 'lucide-react'
import { useEffect, useState } from 'react'

const usuarioService = new UsuarioService()

export default function UsuariosPage() {
  const [list, setList] = useState<Usuario[]>([])
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | undefined>()

  const refresh = () => usuarioService.list().then(usuarios => setList(() => usuarios))

  const onEdit = (usuario: Usuario) => {
    setUsuarioSelecionado(usuario)
  }

  const onDelete = (id: number) => {
    if (!confirm('Remover usuário?')) {
      return
    }

    usuarioService.remove(id)
      .then(() => refresh())
  }

  useEffect(() => {
    refresh()
  }, [])

  return (
    <div>
      <div className='flex gap-2'>
        <Users />
        <h1 className="text-xl font-bold mb-4">Usuários</h1>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <CadastroUsuario usuario={usuarioSelecionado} />

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
