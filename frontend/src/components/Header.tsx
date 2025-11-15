'use client'

import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'

export const Header = () => {
  const { usuario, logout } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <></>
  }

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-sm">
      <div className="flex items-center gap-3">
        <h2 className="font-bold">CobraFácil</h2>
        <span className="text-sm text-gray-500">— controle de empréstimos</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-sm">
          <div>{usuario?.nome}</div>
          <div className="text-xs text-gray-500">{usuario?.email}</div>
        </div>

        <button onClick={logout} className="text-sm text-red-600">Sair</button>
      </div>
    </header>
  )
}
