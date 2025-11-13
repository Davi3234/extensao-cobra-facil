'use client'

import { useEffect, useState } from 'react'

export function useLocalStorage<T = any>(key: string, initialValue?: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window == 'undefined') {
        return initialValue
      }

      const item = localStorage.getItem(key)

      return item ? JSON.parse(item) : initialValue as T
    } catch (error) {
      console.warn(`Erro ao ler a chave "${key}" do localStorage:`, error)

      return initialValue
    }
  })

  useEffect(() => {
    if (typeof window == 'undefined') {
      return
    }

    try {
      localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.warn(`Erro ao salvar a chave "${key}" no localStorage:`, error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue] as const
}
