'use client'

export class MockApi<T extends { id: number }> {
  private storage: T[]

  constructor(
    private key: string,
    initialValues: T[] = []
  ) {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(key)

      this.storage = saved ? JSON.parse(saved) : initialValues

      if (!saved && initialValues.length) {
        this.save()
      }
    } else {
      this.storage = initialValues
    }
  }

  list() {
    return this.storage
  }

  find(id: number) {
    return this.storage.find(item => item.id == id)
  }

  create(data: Omit<T, 'id'>) {
    const id = Date.now()
    const item = { ...(data as any), id } as T

    this.storage.push(item)
    this.save()

    return item
  }

  update(id: number, data: Partial<T>) {
    const index = this.storage.findIndex(item => item.id == id)

    if (index < 0) {
      return null
    }

    this.storage[index] = {
      ...this.storage[index],
      ...data,
      id
    }

    this.save()

    return this.storage[index]
  }

  remove(id: number) {
    const index = this.storage.findIndex((x) => x.id === id)

    if (index < 0) {
      return
    }

    this.storage.splice(index, 1)
    this.save()
  }

  clear() {
    this.storage = []
    this.save()
  }

  private save() {
    localStorage.setItem(this.key, JSON.stringify(this.storage))
  }
}
