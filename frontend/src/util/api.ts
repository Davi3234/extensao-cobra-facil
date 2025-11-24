import { Result } from '@/util/result'

export type RequestApi = Omit<RequestInit, 'body'> & { body?: object }

export async function createApi(prefix?: string, superOptions?: { onRequest?: (url: string, options?: RequestApi) => RequestApi | undefined }) {
  return {
    get: async<TResponse = any>(url: string, options?: RequestApi) => {
      const optionRequest = superOptions?.onRequest ? superOptions?.onRequest(url, options) : options

      return await internalRequest<TResponse>(`${prefix}${url}`, { ...optionRequest, method: 'GET' })
    },
    post: async<TResponse = any>(url: string, options?: RequestApi) => {
      const optionRequest = superOptions?.onRequest ? superOptions?.onRequest(url, options) : options

      return await internalRequest<TResponse>(`${prefix}${url}`, { ...optionRequest, method: 'POST' })
    },
    put: async<TResponse = any>(url: string, options?: RequestApi) => {
      const optionRequest = superOptions?.onRequest ? superOptions?.onRequest(url, options) : options

      return await internalRequest<TResponse>(`${prefix}${url}`, { ...optionRequest, method: 'PUT' })
    },
    delete: async<TResponse = any>(url: string, options?: RequestApi) => {
      const optionRequest = superOptions?.onRequest ? superOptions?.onRequest(url, options) : options

      return await internalRequest<TResponse>(`${prefix}${url}`, { ...optionRequest, method: 'DELETE' })
    },
    options: async<TResponse = any>(url: string, options?: RequestApi) => {
      const optionRequest = superOptions?.onRequest ? superOptions?.onRequest(url, options) : options

      return await internalRequest<TResponse>(`${prefix}${url}`, { ...optionRequest, method: 'OPTIONS' })
    },
  }
}

async function internalRequest<TResponse = any>(url: string, options?: RequestApi) {
  try {
    const optionsRequest = {
      ...options,
      body: options?.body !== undefined ? JSON.stringify(options.body) : undefined,
      headers: {
        ...options?.headers,
        'Content-Type': (options?.headers as any)?.['Content-Type'] || 'application/json',
      },
    }

    const response = await fetch(url, optionsRequest)

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
    case 401:
      return 'Usuário não autenticado'
    case 403:
      return 'Credenciais inválidas'
  }

  return response.statusText || 'Erro desconhecido'
}
