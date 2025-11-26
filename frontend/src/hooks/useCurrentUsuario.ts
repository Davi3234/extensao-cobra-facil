'use client'

import { useEffect, useState } from 'react'

import { useNotification } from '@/hooks/useNotification'
import { getCurrentUsuario } from '@/lib/actions/auth'
import { Usuario } from '@/types/models'

export function useCurrentUsuario() {
  const { notify } = useNotification()
  const [usuario, setUsuario] = useState<Usuario | null>(null)

  const refresh = async () => {
    const response = await getCurrentUsuario()

    if (response.ok) {
      notify({ type: 'error', message: 'Erro ao carregar as informações do Usuário' })
    }

    setUsuario(response.value)
  }

  useEffect(() => {
    refresh()
  }, [])

  return { usuario, refresh }
}
