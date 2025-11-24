'use client'

import { Edit, ShieldOff, Users } from 'lucide-react'
import { useState } from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { CadastroUsuario } from '@/components/usuario/cadastro-usuario'
import { ListUsuario } from '@/components/usuario/list-usuario'
import { inativarUsuarioAction } from '@/lib/actions/usuario'
import { Usuario } from '@/types/models'

export default function UsuariosPage() {
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | undefined>()

  const editar = (usuario: Usuario) => {
    setUsuarioSelecionado(usuario)
  }

  const inativar = (id: number) => {
    if (!confirm('Remover usuário?')) {
      return
    }

    inativarUsuarioAction(id)
  }

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
            <ListUsuario
              item={usuario => (
                <div key={usuario.id}>
                  <div className="flex items-center justify-between p-2">
                    <div>
                      <div className="font-medium">{usuario.nome}</div>
                      <div className="text-xs text-gray-500">{usuario.email} • {usuario.telefone}</div>
                    </div>

                    <div className="flex gap-2">
                      <button onClick={() => editar(usuario)} className="text-blue-600 text-sm"><Edit /></button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className="text-red-600 text-sm"><ShieldOff /></button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Deseja inativar o usuário?</AlertDialogTitle>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => inativar(usuario.id)}>Confirmar</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>

                  <hr className="my-2 border-t border-gray-300 w-full mx-auto" />
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
