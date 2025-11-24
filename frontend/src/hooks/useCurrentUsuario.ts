'use client'

import { useEffect, useState } from 'react'

import { getCurrentUsuario } from '@/lib/actions/auth'
import { Usuario } from '@/types/models'

export function useCurrentUsuario() {
  const [usuario, setUsuario] = useState<Usuario | null>(null)

  useEffect(() => {
    getCurrentUsuario().then(response => {
      if (response.ok) {
        setUsuario(response.value)
      }
    })
  }, [])

  return { usuario }
}
