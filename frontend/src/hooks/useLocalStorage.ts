import { useEffect, useState } from 'react'

export function useLocalStorage<T = any>(key: string, defaultValue?: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)

      return item ? JSON.parse(item) : defaultValue as T
    } catch (error) {
      console.warn(`Erro ao ler a chave "${key}" do localStorage:`, error)

      return defaultValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.warn(`Erro ao salvar a chave "${key}" no localStorage:`, error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue] as const
}
