'use client'

import { useEffect, useState } from 'react'

import { getCurrentUsuario } from '@/lib/actions/auth'
import { Usuario } from '@/types/models'

export function useCurrentUsuario() {
  const [usuario, setUsuario] = useState<Usuario | null>(null)

  const refresh = async () => {
    const response = await getCurrentUsuario()

    setUsuario(response.value)
  }

  useEffect(() => {
    refresh()
  }, [])

  return { usuario, refresh }
}
