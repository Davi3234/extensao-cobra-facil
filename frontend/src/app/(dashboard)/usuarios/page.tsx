import { Users } from 'lucide-react'

import UsuariosContent from '@/components/usuario/usuarios-content'
import { UsuariosProvider } from '@/context/Usuarios'
import { buscarUsuariosAction } from '@/lib/actions/usuario'

export default async function UsuariosPage() {
  const response = await buscarUsuariosAction()
  const usuarios = response.ok ? response.value : []

  return (
    <div>
      <div className='flex gap-2'>
        <Users />
        <h1 className='text-xl font-bold mb-4'>Usuários</h1>
      </div>

      <UsuariosProvider>
        <UsuariosContent usuarios={usuarios} />
      </UsuariosProvider>
    </div>
  )
}
