import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useCallback } from 'react'

export const useMockApi = <T extends object = any>(key: string) => {
  const [storage, setStorage] = useLocalStorage<T[]>(key)

  const create = useCallback((data: T) => {
    const id = Date.now()

    const item: T = { ...data, id }

    setStorage([...storage, item])

    return item
  }, [storage, setStorage])

  const update = useCallback((id: number, data: Partial<T>) => {
    const index = storage.findIndex((x: any) => x.id === id)

    if (index < 0) {
      return null
    }

    const item = {
      ...storage[index],
      ...data,
      id
    }

    setStorage(items => {
      items[index] = item

      return items
    })

    return item
  }, [storage, setStorage])

  const remove = useCallback((id: number) => {
    const index = storage.findIndex((x: any) => x.id === id)

    if (index < 0) {
      return null
    }

    setStorage(items => {
      items.splice(index, 1)

      return items
    })
  }, [storage, setStorage])

  const list = useCallback(() => {
    return storage
  }, [storage])

  const find = useCallback((id: number) => {
    return storage.find((x: any) => x.id === id)
  }, [storage])

  return { list, find, create, update, remove }
}
