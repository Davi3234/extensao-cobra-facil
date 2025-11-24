import { ReactNode, useEffect, useState } from 'react'

import { buscarUsuariosAction } from '@/lib/actions/usuario'
import { Usuario } from '@/types/models'

export type ListUsuarioProps = {
  usuario?: Usuario
  item?: (usuario: Usuario) => ReactNode
}

export function ListUsuario({ usuario: usuarioSelected, item }: ListUsuarioProps) {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])

  useEffect(() => {
    buscarUsuariosAction().then(response => {
      if (response.ok) {
        setUsuarios(response.value)
      }
    })
  })

  return (
    <>
      {usuarios.map(usuario => {
        if (item) {
          return item(usuario)
        }

        return <div key={usuario.id}>
          <div className="flex items-center justify-between p-2">
            <div className="font-medium">{usuario.nome}</div>
            <div className="text-xs text-gray-500">{usuario.email} • {usuario.telefone}</div>
          </div>

          <hr className="my-2 border-t border-gray-300 w-full mx-auto" />
        </div>
      })}

      {usuarios.length === 0 && <div className="text-sm text-gray-500">Nenhum usuário cadastrado.</div>}
    </>
  )
}
