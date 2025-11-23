'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { usuario } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!usuario) {
      router.push('/login')
    }
  }, [usuario, router])

  if (!usuario) {
    return
  }

  return <>{children}</>
}
