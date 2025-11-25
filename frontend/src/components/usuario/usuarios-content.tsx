'use client'

import { Edit, ShieldOff } from 'lucide-react'
import { useContext, useTransition } from 'react'

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
import { NotificationContext } from '@/context/NotificationContext'
import { useUsuarios } from '@/context/Usuarios'
import { inativarUsuarioAction } from '@/lib/actions/usuario'
import { Usuario } from '@/types/models'
import { Button } from '../ui/button'

export type UsuariosContentProps = {
  usuarios: Usuario[]
}

export default function UsuariosContent({ usuarios }: UsuariosContentProps) {
  const { notify } = useContext(NotificationContext)
  const { usuarioSelecionado, setUsuarioSelecionado } = useUsuarios()
  const [isPending, setTransition] = useTransition()

  const inativar = (id: number) => {
    setTransition(async () => {
      try {
        const response = await inativarUsuarioAction(id)

        if (response.ok) {
          notify({ type: 'success', message: 'Usuário inativado com sucesso' })
        } else {
          notify({ type: 'error', message: response.error || 'Erro ao inativar usuário' })
        }
      } catch (error) {
        notify({ type: 'error', message: 'Erro ao inativar usuário' })
      }
    })
  }

  return (
    <div className='grid grid-cols-2 gap-4'>
      <CadastroUsuario
        usuario={usuarioSelecionado}
        onSuccess={() => setUsuarioSelecionado(undefined)}
        disabled={isPending}
      />

      <div className='bg-white p-4 rounded shadow'>
        <h2 className='font-semibold mb-2'>Lista</h2>

        <div className='space-y-2'>
          {usuarios.map(usuario => (
            <div key={usuario.id}>
              <div className='flex items-center justify-between p-2'>
                <div>
                  <div className='font-medium'>{usuario.nome}</div>
                  <div className='text-xs text-gray-500'>{usuario.email} • {usuario.telefone}</div>
                </div>

                <div className='flex gap-1'>
                  <Button
                    variant={'ghost'}
                    onClick={() => setUsuarioSelecionado(usuario)}
                    className='text-blue-600 hover:text-blue-500'
                    size={'icon'}
                    title='Editar'
                    disabled={isPending}
                  >
                    <Edit />
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant={'ghost'} className='text-red-600 hover:text-red-500' size={'icon'} title='Inativar' disabled={isPending}>
                        <ShieldOff />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Deseja inativar o usuário?</AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction className='bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60' onClick={() => inativar(usuario.id)}>Inativar</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>

              <hr className='my-2 border-t border-gray-300 w-full mx-auto' />
            </div>
          ))}

          {usuarios.length === 0 && <div className='text-sm text-gray-500'>Nenhum usuário cadastrado.</div>}
        </div>
      </div>
    </div>
  )
}
