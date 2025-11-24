'use client'

import { useEffect, useState } from 'react'

import { Usuario } from '@/types/models'
import { api } from '@/app/api/api'

export function useCurrentUsuario() {
  const [usuario, setUsuario] = useState<Usuario | null>(null)

  const refresh = async () => {
    const response = await api.get<Usuario>('/api/auth/me', { next: { tags: ['usuario-data'] } })

    console.log(response)

    setUsuario(response.value)
  }

  useEffect(() => {
    refresh()
  }, [])

  return { usuario, refresh }
}
