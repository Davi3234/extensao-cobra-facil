'use client'

import { Usuario } from '@/types/models'
import { createContext, ReactNode, useContext, useState } from 'react'

export type UsuariosContextType = {
  usuarioSelecionado: Usuario | undefined
  setUsuarioSelecionado: (usuario: Usuario | undefined) => void
}

const UsuariosContext = createContext<UsuariosContextType | undefined>(undefined)

export function UsuariosProvider({ children }: { children: ReactNode }) {
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | undefined>()

  return (
    <UsuariosContext.Provider value={{ usuarioSelecionado, setUsuarioSelecionado }}>
      {children}
    </UsuariosContext.Provider>
  )
}

export function useUsuarios() {
  const context = useContext(UsuariosContext)
  if (!context) {
    throw new Error('useUsuarios deve ser usado dentro de UsuariosProvider')
  }
  return context
}
