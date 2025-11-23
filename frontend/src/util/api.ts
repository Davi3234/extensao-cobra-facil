import { Result } from '@/util/result'

export type RequestApi = Omit<RequestInit, 'body'> & { body?: object }

export async function createRequest(prefix?: string) {
  return {
    get: async<TResponse = any>(url: string, options?: RequestApi) =>
      await internalRequest<TResponse>(`${prefix}${url}`, { ...options, method: 'GET' }),
    post: async<TResponse = any>(url: string, options?: RequestApi) =>
      await internalRequest<TResponse>(`${prefix}${url}`, { ...options, method: 'POST' }),
    put: async<TResponse = any>(url: string, options?: RequestApi) =>
      await internalRequest<TResponse>(`${prefix}${url}`, { ...options, method: 'PUT' }),
    delete: async<TResponse = any>(url: string, options?: RequestApi) =>
      await internalRequest<TResponse>(`${prefix}${url}`, { ...options, method: 'DELETE' }),
    options: async<TResponse = any>(url: string, options?: RequestApi) =>
      await internalRequest<TResponse>(`${prefix}${url}`, { ...options, method: 'OPTIONS' }),
  }
}

async function internalRequest<TResponse = any>(url: string, options?: RequestApi) {
  try {
    const response = await fetch(url, {
      ...options,
      body: options?.body !== undefined ? JSON.stringify(options.body) : undefined,
      headers: {
        ...options?.headers,
        'Content-Type': (options?.headers as any)?.['Content-Type'] || 'application/json',
      },
    })

    if (!response.ok) {
      return Result.error<TResponse>(await getError(response))
    }

    const responseData = await response.json()

    return Result.ok<TResponse>(responseData as TResponse)
  } catch (error: any) {
    return Result.error<TResponse>(error.message)
  }
}

async function getError(response: Response) {
  try {
    const data = await response.clone().json()

    if (data?.error) {
      return data.error
    }

    return JSON.stringify(data)
  } catch { }

  switch (response.status) {
    case 403:
      return 'Usuário não autenticado'
  }

  return response.statusText || 'Erro desconhecido'
}
